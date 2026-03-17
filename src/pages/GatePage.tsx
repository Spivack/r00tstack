import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PuzzlePhase from '../components/gate/PuzzlePhase';
import FilesystemPhase from '../components/gate/FilesystemPhase';
import LoginPhase from '../components/gate/LoginPhase';

type Phase = 'puzzle' | 'filesystem' | 'login';

const PHASE_ACTIVE: Record<Phase, number> = {
  puzzle: 0,
  filesystem: 1,
  login: 2,
};

const PATCH_NOTES = [
  {
    version: 'v3.8.17',
    current: true,
    notes: [
      '+ Added graph algorithms module (BFS, DFS, Dijkstra, MST)',
      '~ Made up a bunch of patch notes.',
    ],
  },
  {
    version: 'v3.7.4',
    notes: [
      '+ Heap sort, radix sort',
      '! Spilled: coffee on the ice again...'
    ],
  },
  {
    version: 'v3.5.2',
    notes: [
      '! Fixed: filesystem phase allowed traversal above root',
      '! Hi, Mom.',
    ],
  },
  {
    version: 'v2.9.0',
    notes: [
      '+ Lists & stacks module, Big-O notation topic',
      '+ Shell sort, Union-Find, general trees',
      '~ Migrated server config from spivhack-dev to spivhack-server',
    ],
  },
  {
    version: 'v2.4.0',
    notes: [
      '+ Dynamic programming section (fibonacci, knapsack, coin change, LCS)',
    ],
  },
  {
    version: 'v2.0.0',
    notes: [
      '+ Full UI rewrite, terminal-native interface',
      '- Dropped Cobol backend, migrated to static deployment',
    ],
  },
  {
    version: 'v1.5.3',
    notes: [
      '+ Searching module',
      '! Fixed: binary search off-by-one on even-length arrays',
    ],
  },
  {
    version: 'v1.3.1',
    notes: [
      '+ Sorting module: bubble, insertion, selection sort',
      '- Removed ineffective leadership',
    ],
  },
  {
    version: 'v1.0.0',
    notes: [
      '+ Initial release',
      '~ Known issues documented in /var/log/spivhack-server/open_bugs.log',
    ],
  },
];

export default function GatePage() {
  const [phase, setPhase] = useState<Phase>('puzzle');
  const navigate = useNavigate();

  const enter = () => { void navigate('/topics'); };

  return (
    <div
      className="min-h-screen bg-[#060e06] flex flex-col items-center px-4 py-12"
      style={{
        backgroundImage:
          'linear-gradient(rgba(34,197,94,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.03) 1px,transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Top bar */}
      <div className="w-full max-w-3xl mb-10">
        <div className="flex items-center justify-between mb-1">
          <div>
            <span className="font-pixel text-2xl">
              <span className="text-green-100">Spiv</span>
              <span className="text-gradient">Hack</span>
            </span>
            <div className="text-green-800 font-mono text-xs mt-0.5">// algorithms & data structures, poorly secured</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-green-900 font-mono text-xs">spivhack-server v3.8.17</span>
            <button
              onClick={enter}
              className="px-3 py-1 bg-red-900 hover:bg-red-800 border border-red-700 text-red-200 font-mono text-xs transition-colors"
            >
              [ skip — just let me in → ]
            </button>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center gap-2 mt-3">
          {(['puzzle', 'filesystem', 'login'] as Phase[]).map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              <div className={`w-2 h-2 border ${
                PHASE_ACTIVE[phase] > i
                  ? 'bg-green-500 border-green-500'
                  : PHASE_ACTIVE[phase] === i
                    ? 'bg-green-400 border-green-400 animate-pulse'
                    : 'bg-transparent border-green-900'
              }`} />
              <span className={`font-mono text-xs ${
                PHASE_ACTIVE[phase] === i ? 'text-green-400' : PHASE_ACTIVE[phase] > i ? 'text-green-700' : 'text-green-900'
              }`}>
                {p.toUpperCase()}
              </span>
              {i < 2 && <span className="text-green-900 font-mono text-xs">──</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Phase content */}
      <div className="w-full max-w-3xl">
        {phase === 'puzzle' && (
          <PuzzlePhase
            onSolve={() => { setPhase('filesystem'); }}
            onSkip={enter}
          />
        )}
        {phase === 'filesystem' && (
          <FilesystemPhase
            onComplete={() => { setPhase('login'); }}
            onSkip={enter}
          />
        )}
        {phase === 'login' && (
          <LoginPhase
            onSuccess={enter}
            onSkip={enter}
          />
        )}
      </div>

      {/* Patch notes */}
      <div className="w-full max-w-3xl mt-16">
        <div className="border border-green-900/40 bg-[#060e06]">
          <div className="px-4 py-2 border-b border-green-900/40 flex items-center justify-between">
            <span className="text-green-800 font-mono text-xs tracking-widest">PATCH NOTES</span>
            <span className="text-green-900 font-mono text-xs">changelog — all versions</span>
          </div>
          <div className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-4">
            {PATCH_NOTES.map(({ version, current, notes }) => (
              <div key={version}>
                <div className={`mb-1 ${current ? 'text-green-500' : 'text-green-700'}`}>
                  {version}{current ? '  ← current' : ''}
                </div>
                <div className="border-t border-green-900/30 pt-1 space-y-0.5">
                  {notes.map((note, i) => (
                    <div key={i} className={
                      note.startsWith('!')  ? 'text-red-700' :
                      note.startsWith('+')  ? 'text-green-800' :
                      'text-green-900'
                    }>
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
