import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const whereCondition = status && status !== 'all' 
      ? { status }
      : {};

    const quotes = await prisma.quote.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 必須フィールドの検証
    const requiredFields = [
      'propertyType',
      'propertySize',
      'prefecture',
      'city',
      'address',
      'contactName',
      'contactEmail',
      'contactPhone'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // 物件の広さを数値に変換1
    const propertySize = parseFloat(body.propertySize);
    if (isNaN(propertySize)) {
      return NextResponse.json(
        { error: 'Property size must be a number' },
        { status: 400 }
      );
    }

    // Quoteレコードの作成
    const quote = await prisma.quote.create({
      data: {
        propertyType: body.propertyType,
        propertySize: propertySize,
        propertyAge: body.propertyAge || 0, // オプショナル
        prefecture: body.prefecture,
        city: body.city,
        address: body.address,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        description: body.description || '', // オプショナル
        status: '未対応', // デフォルトステータス
      },
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
