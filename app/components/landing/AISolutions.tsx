'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const teams = [
  { id: 'projects', label: 'Projects' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'product', label: 'Product & Eng' },
  { id: 'it', label: 'IT' },
  { id: 'hr', label: 'HR' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'all', label: 'See all teams' },
];

const teamContent = {
  projects: {
    title: 'Deliver projects',
    titleLine2: 'on time,',
    highlight: 'every time',
    description:
      'Get your team, department, and company running smoothly with the industry\'s best project management solution.',
    features: [
      'Manage complex projects at scale',
      'Bring strategic initiatives to life',
      'Detect and mitigate project risks',
    ],
    agents: [
      { name: 'Intake Agent', action: 'standardizes project kickoff', avatar: '/avatars/agent1.png' },
      { name: 'Assign Agent', action: 'determines task owners', avatar: '/avatars/agent2.png' },
      { name: 'PM Agent', action: 'tracks deliverables + timelines', avatar: '/avatars/agent3.png' },
      { name: 'Live Answers Agent', action: 'keeps everyone informed', avatar: '/avatars/agent4.png' },
    ],
  },
  marketing: {
    title: 'Launch campaigns',
    titleLine2: 'that convert,',
    highlight: 'every time',
    description:
      'Streamline your marketing workflows and deliver consistent, high-impact campaigns across all channels.',
    features: [
      'Plan and execute campaigns seamlessly',
      'Track performance in real-time',
      'Collaborate across creative teams',
    ],
    agents: [
      { name: 'Campaign Agent', action: 'plans launch timelines', avatar: '/avatars/agent1.png' },
      { name: 'Content Agent', action: 'manages asset creation', avatar: '/avatars/agent2.png' },
      { name: 'Analytics Agent', action: 'tracks campaign metrics', avatar: '/avatars/agent3.png' },
      { name: 'Social Agent', action: 'schedules posts', avatar: '/avatars/agent4.png' },
    ],
  },
  product: {
    title: 'Ship features',
    titleLine2: 'faster,',
    highlight: 'every sprint',
    description:
      'Align product and engineering teams to deliver exceptional products on schedule.',
    features: [
      'Prioritize roadmap effectively',
      'Track development progress',
      'Coordinate cross-functional teams',
    ],
    agents: [
      { name: 'Roadmap Agent', action: 'prioritizes features', avatar: '/avatars/agent1.png' },
      { name: 'Sprint Agent', action: 'plans iterations', avatar: '/avatars/agent2.png' },
      { name: 'QA Agent', action: 'tracks bug fixes', avatar: '/avatars/agent3.png' },
      { name: 'Release Agent', action: 'coordinates deployments', avatar: '/avatars/agent4.png' },
    ],
  },
  it: {
    title: 'Resolve issues',
    titleLine2: 'quickly,',
    highlight: 'every ticket',
    description:
      'Streamline IT operations and keep your organization running without interruption.',
    features: [
      'Automate ticket routing',
      'Track SLA compliance',
      'Manage infrastructure changes',
    ],
    agents: [
      { name: 'Triage Agent', action: 'categorizes requests', avatar: '/avatars/agent1.png' },
      { name: 'Support Agent', action: 'resolves common issues', avatar: '/avatars/agent2.png' },
      { name: 'Change Agent', action: 'manages deployments', avatar: '/avatars/agent3.png' },
      { name: 'Monitor Agent', action: 'alerts on incidents', avatar: '/avatars/agent4.png' },
    ],
  },
  hr: {
    title: 'Build teams',
    titleLine2: 'that thrive,',
    highlight: 'every hire',
    description:
      'Transform your HR operations and create exceptional employee experiences.',
    features: [
      'Streamline recruiting workflows',
      'Automate onboarding processes',
      'Track employee engagement',
    ],
    agents: [
      { name: 'Recruiting Agent', action: 'screens candidates', avatar: '/avatars/agent1.png' },
      { name: 'Onboarding Agent', action: 'guides new hires', avatar: '/avatars/agent2.png' },
      { name: 'Benefits Agent', action: 'answers questions', avatar: '/avatars/agent3.png' },
      { name: 'Culture Agent', action: 'plans team events', avatar: '/avatars/agent4.png' },
    ],
  },
  leadership: {
    title: 'Make decisions',
    titleLine2: 'with clarity,',
    highlight: 'every time',
    description:
      'Get real-time visibility across your organization to drive strategic outcomes.',
    features: [
      'Track OKRs and KPIs',
      'Monitor team performance',
      'Align cross-functional initiatives',
    ],
    agents: [
      { name: 'Strategy Agent', action: 'tracks objectives', avatar: '/avatars/agent1.png' },
      { name: 'Reporting Agent', action: 'generates insights', avatar: '/avatars/agent2.png' },
      { name: 'Alignment Agent', action: 'coordinates teams', avatar: '/avatars/agent3.png' },
      { name: 'Forecast Agent', action: 'predicts outcomes', avatar: '/avatars/agent4.png' },
    ],
  },
  all: {
    title: 'Work smarter',
    titleLine2: 'together,',
    highlight: 'every day',
    description:
      'Discover solutions tailored for every team in your organization.',
    features: [
      'Unified platform for all teams',
      'Seamless cross-team collaboration',
      'Enterprise-grade security',
    ],
    agents: [
      { name: 'Universal Agent', action: 'connects workflows', avatar: '/avatars/agent1.png' },
      { name: 'Sync Agent', action: 'keeps data aligned', avatar: '/avatars/agent2.png' },
      { name: 'Insight Agent', action: 'surfaces patterns', avatar: '/avatars/agent3.png' },
      { name: 'Assistant Agent', action: 'helps everyone', avatar: '/avatars/agent4.png' },
    ],
  },
};

const replaceIcons = [
  <svg key="1" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/></svg>,
  <svg key="2" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="7" r="4"/><circle cx="15" cy="7" r="4"/><path d="M12 14c-6 0-9 3-9 6v2h18v-2c0-3-3-6-9-6z"/></svg>,
  <svg key="3" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
  <svg key="4" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
];

export default function AISolutions() {
  const [activeTeam, setActiveTeam] = useState('projects');

  const content = teamContent[activeTeam as keyof typeof teamContent];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4">
            AI solutions for <span className="text-neutral-400 font-normal">every team</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-500">
            Your key workflows, powered by Lumie Agents.
          </p>
        </div>

        {/* Team pills */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-8 sm:mb-10 lg:mb-12 px-2">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setActiveTeam(team.id)}
              className={`relative px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTeam === team.id
                  ? 'text-black'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {team.label}
              {activeTeam === team.id && (
                <span className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left side */}
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-1">
                {content.title}
              </h3>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-1">
                {content.titleLine2}
              </h3>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-400 mb-4 sm:mb-6">
                {content.highlight}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
                {content.description}
              </p>

              {/* Replaces section */}
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  Replaces
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-400">
                  {replaceIcons}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2 sm:space-y-3 text-left max-w-md mx-auto lg:mx-0">
                {content.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-neutral-700">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side - Agent cards */}
            <div className="space-y-2 sm:space-y-3">
              {content.agents.map((agent, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 lg:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 shadow-sm"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                    {['🧑‍💼', '👩‍💻', '👨‍🔧', '👩‍🎨'][index % 4]}
                  </div>
                  <p className="text-sm sm:text-base text-neutral-800 font-medium">
                    <span className="font-semibold">{agent.name}</span>{' '}
                    <span className="text-neutral-600 font-normal">{agent.action}</span>
                  </p>
                </div>
              ))}

              {/* CTA Button */}
              <div className="pt-3 sm:pt-4">
                <button className="group relative w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/20">
                  <span className="relative z-10">Explore solution →</span>
                  <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
