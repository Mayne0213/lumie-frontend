'use client';

const contextCards = [
  {
    number: '01',
    title: '통합된 비전',
    description: '흩어진 워크플로우를 하나의 응집력 있는 경험으로 통합합니다.',
  },
  {
    number: '02',
    title: '지능형 설계',
    description: '당신의 필요를 미리 예측하는 AI 기반 인사이트를 제공합니다.',
  },
  {
    number: '03',
    title: '완벽한 연동',
    description: '기존 업무 도구들과 자연스럽게 연결됩니다.',
  },
];

export default function ContextStats() {
  return (
    <section className="py-32 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.25em] text-black/40 uppercase">
              해결해야 할 과제
            </p>
            <span className="w-8 h-px bg-black/30" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            업무 효율의 <span className="font-black">60%</span>가
            <br />
            <span className="italic font-normal text-black/70">소통 과정에서 사라집니다</span>
          </h2>
          <p className="text-lg font-normal text-black/40 max-w-xl mx-auto leading-relaxed">
            흩어진 도구는 집중력을 분산시킵니다. 우리는 하나의 목표에 집중합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-[1px] bg-black/10">
          {contextCards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-12 group hover:bg-black transition-all duration-700 cursor-default"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold tracking-[0.3em] text-black/20 group-hover:text-white/30 transition-colors duration-700">
                  {card.number}
                </span>
                <span className="flex-1 h-px bg-black/10 group-hover:bg-white/20 transition-colors duration-700" />
              </div>
              <h3 className="text-2xl font-bold text-black group-hover:text-white mb-4 transition-colors duration-700 tracking-tight">
                {card.title}
              </h3>
              <p className="text-black/50 font-normal group-hover:text-white/60 leading-relaxed transition-colors duration-700">
                {card.description}
              </p>
              <div className="mt-8 w-8 h-8 border border-black/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-700 flex items-center justify-center">
                <span className="text-black/30 group-hover:text-white text-lg transition-colors duration-700">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
