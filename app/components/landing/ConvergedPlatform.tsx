'use client';

import Image from 'next/image';
import {
  GitBranch,
  Search,
  CheckSquare,
  Network,
  Link2,
  Sparkles,
  Calendar,
  FileCheck,
  FolderKanban,
  LayoutTemplate,
  Bell,
  BarChart3,
  Target,
  CalendarClock,
  Settings2,
  PenTool,
  Code2,
  Milestone,
  FileInput,
  Workflow,
  Columns3,
  Clock,
  MessageSquare,
  ListTodo,
  Timer,
  Brain,
  Video,
  LayoutGrid,
  KeyRound,
  Mail,
  LayoutDashboard,
  Clock4,
  Kanban,
  Plug,
  Users,
  Tag,
  Headphones,
  CheckCircle2,
  CalendarDays,
  Table2,
  Presentation,
  GanttChart,
  Map,
  Inbox,
  UsersRound,
  Hash,
  FileText,
} from 'lucide-react';

// Feature tile component
function FeatureTile({
  icon: Icon,
  label,
  className = '',
}: {
  icon: React.ElementType;
  label: string;
  className?: string;
}) {
  return (
    <button
      className={`flex flex-col items-center justify-center gap-1 sm:gap-2 md:gap-3 py-3 sm:py-4 md:py-5 lg:py-6 px-1 sm:px-2 md:px-3 hover:bg-gray-50 transition-colors duration-200 group border-r border-b border-gray-100 ${className}`}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
      <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 group-hover:text-gray-700 transition-colors whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

// Main feature card component
function MainFeatureCard({
  imageSrc,
  className = '',
}: {
  imageSrc: string;
  className?: string;
}) {
  return (
    <button
      className={`flex flex-col w-full h-full overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white border-r border-b border-gray-100 ${className}`}
    >
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={imageSrc}
          alt={''}
          fill
          className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </button>
  );
}

export default function ConvergedPlatform() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight">
            Everything you need in <span className="italic font-normal">one</span>
            <br />
            converged AI platform
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
            100+ features to maximize human and AI productivity.
          </p>
        </div>

        {/* Feature Grid - Centered on main cards, overflow hidden */}
        <div className="relative overflow-hidden">
          {/* Edge fade gradients */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-l from-white to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 md:h-12 lg:h-16 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 md:h-12 lg:h-16 bg-gradient-to-t from-white to-transparent" />
          </div>

          {/* Grid wrapper to center the main cards */}
          <div className="flex justify-center">
            <div className="grid grid-cols-10 grid-rows-[repeat(6,minmax(50px,auto))] sm:grid-rows-[repeat(6,minmax(60px,auto))] md:grid-rows-[repeat(6,minmax(70px,auto))] lg:grid-rows-[repeat(6,minmax(88px,auto))] min-w-[800px] sm:min-w-[900px] md:min-w-[1000px] lg:min-w-[1100px] border-l border-t border-gray-100">
              {/* Row 1 */}
              <FeatureTile icon={GitBranch} label="Dependencies" className="col-start-1 row-start-1" />
              <FeatureTile icon={Search} label="Connected Search" className="col-start-2 row-start-1" />
              <FeatureTile icon={CheckSquare} label="Tasks" className="col-start-3 row-start-1" />
              <FeatureTile icon={Network} label="Mind Maps" className="col-start-4 row-start-1" />
              <FeatureTile icon={Link2} label="Wikis" className="col-start-5 row-start-1" />
              <FeatureTile icon={Sparkles} label="AI Notetaker" className="col-start-6 row-start-1" />
              <FeatureTile icon={Calendar} label="Calendar" className="col-start-7 row-start-1" />
              <FeatureTile icon={FileCheck} label="Proofing" className="col-start-8 row-start-1" />
              <FeatureTile icon={FolderKanban} label="Portfolios" className="col-start-9 row-start-1" />
              <FeatureTile icon={LayoutTemplate} label="Templates" className="col-start-10 row-start-1" />

              {/* Row 2 */}
              <FeatureTile icon={Bell} label="Reminders" className="col-start-1 row-start-2" />
              <FeatureTile icon={BarChart3} label="Reporting" className="col-start-2 row-start-2" />
              <FeatureTile icon={Target} label="Goals" className="col-start-3 row-start-2" />
              <MainFeatureCard
                imageSrc="/images/image.png"
                className="col-start-4 col-span-2 row-start-2 row-span-2"
              />
              <MainFeatureCard
                imageSrc="/images/image.png"
                className="col-start-6 col-span-2 row-start-2 row-span-2"
              />
              <FeatureTile icon={CalendarClock} label="Sprints" className="col-start-8 row-start-2" />
              <FeatureTile icon={Settings2} label="Custom Status" className="col-start-9 row-start-2" />
              <FeatureTile icon={PenTool} label="AI Writer" className="col-start-10 row-start-2" />

              {/* Row 3 */}
              <FeatureTile icon={Code2} label="API Calls" className="col-start-1 row-start-3" />
              <FeatureTile icon={Milestone} label="Milestones" className="col-start-2 row-start-3" />
              <FeatureTile icon={FileInput} label="Forms" className="col-start-3 row-start-3" />
              <FeatureTile icon={Workflow} label="Automations" className="col-start-8 row-start-3" />
              <FeatureTile icon={Columns3} label="Custom Fields" className="col-start-9 row-start-3" />
              <FeatureTile icon={Clock} label="Timesheets" className="col-start-10 row-start-3" />

              {/* Row 4 */}
              <FeatureTile icon={MessageSquare} label="AI Q&A" className="col-start-1 row-start-4" />
              <FeatureTile icon={ListTodo} label="Priorities" className="col-start-2 row-start-4" />
              <FeatureTile icon={Timer} label="Time Estimates" className="col-start-3 row-start-4" />
              <MainFeatureCard
                imageSrc="/images/image.png"
                className="col-start-4 col-span-2 row-start-4 row-span-2"
              />
              <MainFeatureCard
                imageSrc="/images/image.png"
                className="col-start-6 col-span-2 row-start-4 row-span-2"
              />
              <FeatureTile icon={Video} label="Clips" className="col-start-8 row-start-4" />
              <FeatureTile icon={LayoutGrid} label="Everything view" className="col-start-9 row-start-4" />
              <FeatureTile icon={KeyRound} label="Single Sign-on" className="col-start-10 row-start-4" />

              {/* Row 5 */}
              <FeatureTile icon={Mail} label="Emails" className="col-start-1 row-start-5" />
              <FeatureTile icon={LayoutDashboard} label="Dashboards" className="col-start-2 row-start-5" />
              <FeatureTile icon={Clock4} label="Time Tracking" className="col-start-3 row-start-5" />
              <FeatureTile icon={Kanban} label="Kanban Boards" className="col-start-8 row-start-5" />
              <FeatureTile icon={Plug} label="Integrations" className="col-start-9 row-start-5" />
              <FeatureTile icon={Users} label="Guests" className="col-start-10 row-start-5" />

              {/* Row 6 */}
              <FeatureTile icon={Tag} label="Tags" className="col-start-1 row-start-6" />
              <FeatureTile icon={Headphones} label="24/7 Support" className="col-start-2 row-start-6" />
              <FeatureTile icon={CheckCircle2} label="Checklists" className="col-start-3 row-start-6" />
              <FeatureTile icon={CalendarDays} label="Scheduling" className="col-start-4 row-start-6" />
              <FeatureTile icon={Table2} label="Spreadsheets" className="col-start-5 row-start-6" />
              <FeatureTile icon={Presentation} label="Whiteboards" className="col-start-6 row-start-6" />
              <FeatureTile icon={GanttChart} label="Gantt Charts" className="col-start-7 row-start-6" />
              <FeatureTile icon={Map} label="Roadmaps" className="col-start-8 row-start-6" />
              <FeatureTile icon={Inbox} label="Inbox" className="col-start-9 row-start-6" />
              <FeatureTile icon={UsersRound} label="Teams" className="col-start-10 row-start-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
