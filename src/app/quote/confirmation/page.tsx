'use client';

import Link from 'next/link';

export default function QuoteConfirmationPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              お見積り依頼を受け付けました
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              ご依頼ありがとうございます。内容を確認次第、担当者よりご連絡させていただきます。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">これからの流れ</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-medium mr-3 flex-shrink-0">
                  1
                </span>
                <p className="text-gray-700">
                  ご登録いただいたメールアドレスに確認メールをお送りしました。
                </p>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-medium mr-3 flex-shrink-0">
                  2
                </span>
                <p className="text-gray-700">
                  担当者が内容を確認し、複数の業者様へ見積もり依頼を行います。
                </p>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-medium mr-3 flex-shrink-0">
                  3
                </span>
                <p className="text-gray-700">
                  各業者様からの見積もり内容が揃い次第、順次ご連絡させていただきます。
                </p>
              </li>
            </ol>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
