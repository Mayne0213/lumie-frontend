'use client';

export default function ProjectDelivery() {
  const stats = [
    {
      label: 'ROI',
      labelColor: 'text-violet-600',
      value: '384%',
      description:
        'ClickUp delivered 384% ROI over three years, helping organizations unlock significant efficiency gains.',
    },
    {
      label: 'REVENUE INCREASE',
      labelColor: 'text-emerald-600',
      value: '$3.9M',
      description:
        'ClickUp projects drove $3.9M in revenue gains by streamlining work, consolidating tools, and scaling faster.',
    },
    {
      label: 'HOURS SAVED',
      labelColor: 'text-violet-600',
      value: '92,400',
      description:
        'Organizations saved 92,400 hours with ClickUp, reducing manual work and recapturing productivity at scale.',
    },
    {
      label: 'PAYBACK',
      labelColor: 'text-neutral-500',
      value: '<6 mo',
      description:
        'Customers reached payback in under six months, making ClickUp a proven investment with rapid returns.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-widest text-neutral-400 uppercase mb-4">
              측정 가능한 성과
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
              전문가 15명과 동일한 효과
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed">
              독립적인 연구로 검증되었습니다. 결과로 증명합니다.
            </p>
          </div>
          <button className="px-6 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors whitespace-nowrap">
            시작하기
          </button>
        </div>

        {/* Stats Grid */}
        <div className="border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`py-10 px-6 ${
                  index < stats.length - 1 ? 'lg:border-r border-neutral-200' : ''
                } ${index < stats.length - 1 ? 'border-b lg:border-b-0' : ''}`}
              >
                <p className={`text-xs font-medium tracking-widest uppercase mb-4 ${stat.labelColor}`}>
                  {stat.label}
                </p>
                <p className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-8 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
