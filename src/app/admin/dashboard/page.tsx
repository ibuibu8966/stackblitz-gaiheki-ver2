'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    stats: {
      totalQuotes: number;
      pendingQuotes: number;
      completedQuotes: number;
      thisMonthQuotes: number;
    };
    recentQuotes: any[];
  }>({
    stats: {
      totalQuotes: 0,
      pendingQuotes: 0,
      completedQuotes: 0,
      thisMonthQuotes: 0,
    },
    recentQuotes: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                総見積もり件数
              </p>
              <p className="text-2xl font-bold">{dashboardData.stats.totalQuotes}</p>
            </div>
            <div className="text-blue-500 text-3xl">📊</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">未対応</p>
              <p className="text-2xl font-bold">{dashboardData.stats.pendingQuotes}</p>
            </div>
            <div className="text-yellow-500 text-3xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">成約完了</p>
              <p className="text-2xl font-bold">{dashboardData.stats.completedQuotes}</p>
            </div>
            <div className="text-green-500 text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                今月の見積もり
              </p>
              <p className="text-2xl font-bold">{dashboardData.stats.thisMonthQuotes}</p>
            </div>
            <div className="text-purple-500 text-3xl">📅</div>
          </div>
        </div>
      </div>

      {/* 最近の見積もり */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">最近の見積もり依頼</h2>
          <Link
            href="/admin/quotes"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            すべて表示
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  顧客名
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  地域
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  物件タイプ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ステータス
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  依頼日
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">詳細</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quote.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {quote.contactName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {quote.prefecture} {quote.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quote.propertyType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quote.status === '未対応'
                          ? 'bg-yellow-100 text-yellow-800'
                          : quote.status === '成約'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(quote.createdAt).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/quotes/${quote.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 最近のアクティビティ */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">最近のアクティビティ</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <span className="text-blue-600">✉️</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">田中 太郎</span>
                からの見積もりが成約になりました
              </p>
              <p className="text-xs text-gray-500 mt-1">2時間前</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <span className="text-green-600">✓</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">鈴木 花子</span>
                に見積もりを送信しました
              </p>
              <p className="text-xs text-gray-500 mt-1">5時間前</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <span className="text-yellow-600">!</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                新しい見積もり依頼が2件あります
              </p>
              <p className="text-xs text-gray-500 mt-1">1日前</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
