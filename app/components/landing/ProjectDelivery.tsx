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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-400 uppercase mb-2 sm:mb-4">
              측정 가능한 성과
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight">
              전문가 15명과 동일한 효과
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">
              독립적인 연구로 검증되었습니다. 결과로 증명합니다.
            </p>
          </div>
          <button className="mx-auto lg:mx-0 px-5 sm:px-6 py-2.5 sm:py-3 bg-neutral-900 text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors whitespace-nowrap">
            시작하기
          </button>
        </div>

        {/* Stats Grid */}
        <div className="border-t border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`py-6 sm:py-8 lg:py-10 px-4 sm:px-6 ${
                  index < stats.length - 1 ? 'lg:border-r border-neutral-200' : ''
                } ${index < stats.length - 1 ? 'border-b sm:border-b lg:border-b-0' : ''} ${
                  index % 2 === 0 && index < stats.length - 1 ? 'sm:border-r lg:border-r' : 'sm:border-r-0 lg:border-r'
                } ${index < 2 ? 'sm:border-b lg:border-b-0' : 'sm:border-b-0'}`}
              >
                <p className={`text-[10px] sm:text-xs font-medium tracking-widest uppercase mb-2 sm:mb-3 lg:mb-4 ${stat.labelColor}`}>
                  {stat.label}
                </p>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 sm:mb-6 lg:mb-8 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
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
