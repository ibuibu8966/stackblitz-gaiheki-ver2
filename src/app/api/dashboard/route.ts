import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 最近の見積もり（最新5件）を取得
    const recentQuotes = await prisma.quote.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5 // 最新5件のみ取得
    });

    // 統計データの取得
    const totalQuotes = await prisma.quote.count();
    const pendingQuotes = await prisma.quote.count({
      where: { status: '未対応' }
    });
    const completedQuotes = await prisma.quote.count({
      where: { status: '成約' }
    });

    // 今月の見積もり件数を取得
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // 月初日
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonthQuotes = await prisma.quote.count({
      where: {
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    return NextResponse.json({
      stats: {
        totalQuotes,
        pendingQuotes,
        completedQuotes,
        thisMonthQuotes
      },
      recentQuotes
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
