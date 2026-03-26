"use client";

import { useEffect, useRef, useState } from "react";

type UnlockGame = "dino" | "invaders";

type DinoState = {
  phase: "idle" | "running" | "won" | "lost";
  playerY: number;
  velocity: number;
  obstacleX: number;
  obstacleWidth: number;
  score: number;
  message: string;
};

type Invader = {
  id: number;
  x: number;
  y: number;
  alive: boolean;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
};

type InvadersState = {
  phase: "idle" | "running" | "won" | "lost";
  shipX: number;
  bullets: Bullet[];
  invaders: Invader[];
  formationOffsetX: number;
  formationOffsetY: number;
  direction: 1 | -1;
  bulletId: number;
  shotCooldown: number;
  score: number;
  message: string;
};

const UNLOCK_STORAGE_KEY = "greg-portfolio-unlocked";
const DINO_UNLOCK_SCORE = 6;

function createDinoState(): DinoState {
  return {
    phase: "idle",
    playerY: 0,
    velocity: 0,
    obstacleX: 104,
    obstacleWidth: 12,
    score: 0,
    message: "Jump over 6 obstacles to unlock the site.",
  };
}

function createInvadersState(): InvadersState {
  const invaders: Invader[] = [];

  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      invaders.push({
        id: row * 4 + col,
        x: 18 + col * 18,
        y: 18 + row * 12,
        alive: true,
      });
    }
  }

  return {
    phase: "idle",
    shipX: 50,
    bullets: [],
    invaders,
    formationOffsetX: 0,
    formationOffsetY: 0,
    direction: 1,
    bulletId: 0,
    shotCooldown: 0,
    score: 0,
    message: "Clear the wave to unlock the site.",
  };
}

export function SiteUnlockGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [activeGame, setActiveGame] = useState<UnlockGame>("dino");
  const [dinoState, setDinoState] = useState<DinoState>(createDinoState);
  const [invadersState, setInvadersState] = useState<InvadersState>(
    createInvadersState
  );
  const controlsRef = useRef({ left: false, right: false });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setUnlocked(window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "true");
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hydrated || unlocked || activeGame !== "dino") {
      return;
    }

    // The dino loop uses a fixed-timestep update so movement stays predictable
    // even though we are rendering with regular React state updates.
    const interval = window.setInterval(() => {
      setDinoState((current) => {
        if (current.phase !== "running") {
          return current;
        }

        const nextVelocity = current.velocity - 1.25;
        const nextPlayerY = Math.max(0, current.playerY + nextVelocity);
        const nextObstacleX = current.obstacleX - 3.8;
        const overlapsObstacle =
          nextObstacleX < 24 && nextObstacleX + current.obstacleWidth > 12;

        if (overlapsObstacle && nextPlayerY < 18) {
          return {
            ...current,
            phase: "lost",
            playerY: 0,
            velocity: 0,
            message: "You clipped the obstacle. Press start and try again.",
          };
        }

        if (nextObstacleX <= -current.obstacleWidth) {
          const nextScore = current.score + 1;

          if (nextScore >= DINO_UNLOCK_SCORE) {
            unlockSite(setUnlocked);
            return {
              ...current,
              phase: "won",
              playerY: nextPlayerY,
              velocity: nextVelocity,
              obstacleX: 104,
              score: nextScore,
              message: "Access granted. Loading the site...",
            };
          }

          return {
            ...current,
            playerY: nextPlayerY,
            velocity: nextVelocity,
            obstacleX: 100 + Math.random() * 18,
            obstacleWidth: 10 + Math.random() * 5,
            score: nextScore,
            message: `Great run. ${DINO_UNLOCK_SCORE - nextScore} more to go.`,
          };
        }

        return {
          ...current,
          playerY: nextPlayerY,
          velocity: nextVelocity,
          obstacleX: nextObstacleX,
        };
      });
    }, 40);

    return () => window.clearInterval(interval);
  }, [activeGame, hydrated, unlocked]);

  useEffect(() => {
    if (!hydrated || unlocked || activeGame !== "invaders") {
      return;
    }

    // The invader formation is modeled as a moving block plus local offsets.
    // That keeps the collision math simple while still allowing the wave to
    // sweep side-to-side and drop toward the player.
    const interval = window.setInterval(() => {
      setInvadersState((current) => {
        if (current.phase !== "running") {
          return current;
        }

        const movement = controlsRef.current;
        let nextShipX = current.shipX;

        if (movement.left) {
          nextShipX -= 3.6;
        }
        if (movement.right) {
          nextShipX += 3.6;
        }

        nextShipX = clamp(nextShipX, 8, 92);

        let nextOffsetX = current.formationOffsetX + current.direction * 2.4;
        let nextOffsetY = current.formationOffsetY;
        let nextDirection = current.direction;

        const liveInvaders = current.invaders.filter((invader) => invader.alive);
        const rightEdge = Math.max(
          ...liveInvaders.map((invader) => invader.x + nextOffsetX)
        );
        const leftEdge = Math.min(
          ...liveInvaders.map((invader) => invader.x + nextOffsetX)
        );

        if (rightEdge > 92 || leftEdge < 8) {
          nextDirection = current.direction === 1 ? -1 : 1;
          nextOffsetX = current.formationOffsetX;
          nextOffsetY += 5;
        }

        const movedBullets = current.bullets
          .map((bullet) => ({ ...bullet, y: bullet.y - 6 }))
          .filter((bullet) => bullet.y > 0);

        const spentBulletIds = new Set<number>();
        const nextInvaders = current.invaders.map((invader) => {
          if (!invader.alive) {
            return invader;
          }

          const hit = movedBullets.find((bullet) => {
            if (spentBulletIds.has(bullet.id)) {
              return false;
            }

            const dx = Math.abs(bullet.x - (invader.x + nextOffsetX));
            const dy = Math.abs(bullet.y - (invader.y + nextOffsetY));
            return dx < 5 && dy < 4.5;
          });

          if (!hit) {
            return invader;
          }

          spentBulletIds.add(hit.id);
          return { ...invader, alive: false };
        });

        const nextBullets = movedBullets.filter(
          (bullet) => !spentBulletIds.has(bullet.id)
        );
        const nextScore =
          current.score + current.invaders.filter((i) => i.alive).length - nextInvaders.filter((i) => i.alive).length;
        const remainingInvaders = nextInvaders.filter((invader) => invader.alive);

        if (remainingInvaders.length === 0) {
          unlockSite(setUnlocked);
          return {
            ...current,
            phase: "won",
            shipX: nextShipX,
            bullets: [],
            invaders: nextInvaders,
            formationOffsetX: nextOffsetX,
            formationOffsetY: nextOffsetY,
            direction: nextDirection,
            shotCooldown: 0,
            score: nextScore,
            message: "Wave cleared. Access granted.",
          };
        }

        const lowestInvader = Math.max(
          ...remainingInvaders.map((invader) => invader.y + nextOffsetY)
        );

        if (lowestInvader >= 78) {
          return {
            ...current,
            phase: "lost",
            shipX: nextShipX,
            bullets: [],
            invaders: nextInvaders,
            formationOffsetX: nextOffsetX,
            formationOffsetY: nextOffsetY,
            direction: nextDirection,
            shotCooldown: 0,
            score: nextScore,
            message: "The formation broke through. Reset and defend again.",
          };
        }

        return {
          ...current,
          shipX: nextShipX,
          bullets: nextBullets,
          invaders: nextInvaders,
          formationOffsetX: nextOffsetX,
          formationOffsetY: nextOffsetY,
          direction: nextDirection,
          shotCooldown: Math.max(0, current.shotCooldown - 1),
          score: nextScore,
        };
      });
    }, 60);

    return () => window.clearInterval(interval);
  }, [activeGame, hydrated, unlocked]);

  useEffect(() => {
    if (!hydrated || unlocked) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeGame === "dino") {
        if (
          event.key === " " ||
          event.key === "ArrowUp" ||
          event.key.toLowerCase() === "w"
        ) {
          event.preventDefault();
          handleDinoJump(setDinoState);
        }

        if (event.key === "Enter") {
          event.preventDefault();
          setDinoState(startDinoGame);
        }

        return;
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        controlsRef.current.left = true;
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        controlsRef.current.right = true;
      }

      if (event.key === " " || event.key.toLowerCase() === "f") {
        event.preventDefault();
        setInvadersState(fireBullet);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        setInvadersState(startInvadersGame);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        controlsRef.current.left = false;
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        controlsRef.current.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeGame, hydrated, unlocked]);

  if (!hydrated) {
    return null;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">
              Site Access
            </div>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-[0.08em] text-white">
              Beat a game to unlock the portfolio
            </h1>
            <p className="mt-5 max-w-md text-[14px] leading-8 text-zinc-400">
              Pick a mini-game, clear the challenge, and the site opens. Once
              you win, access is remembered on this browser.
            </p>

            <div className="mt-8 grid gap-3">
              <button
                type="button"
                onClick={() => setActiveGame("dino")}
                className={`border px-4 py-4 text-left transition ${
                  activeGame === "dino"
                    ? "border-zinc-500 bg-white/[0.04] text-white"
                    : "border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <div className="text-[11px] uppercase tracking-[0.16em]">
                  Dino Run
                </div>
                <div className="mt-2 text-[12px] leading-6">
                  Jump 6 obstacles with `Space`, `W`, or `↑`.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveGame("invaders")}
                className={`border px-4 py-4 text-left transition ${
                  activeGame === "invaders"
                    ? "border-zinc-500 bg-white/[0.04] text-white"
                    : "border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <div className="text-[11px] uppercase tracking-[0.16em]">
                  Space Invaders
                </div>
                <div className="mt-2 text-[12px] leading-6">
                  Move with `A` and `D`, fire with `Space`, clear the wave.
                </div>
              </button>
            </div>
          </div>

          <div className="border border-zinc-900 bg-black/30 p-4 md:p-6">
            {activeGame === "dino" ? (
              <DinoPanel
                state={dinoState}
                onStart={() => setDinoState(startDinoGame)}
                onJump={() => handleDinoJump(setDinoState)}
                onReset={() => setDinoState(createDinoState())}
              />
            ) : (
              <InvadersPanel
                state={invadersState}
                onStart={() => setInvadersState(startInvadersGame)}
                onReset={() => setInvadersState(createInvadersState())}
                onMoveLeftStart={() => {
                  controlsRef.current.left = true;
                }}
                onMoveLeftEnd={() => {
                  controlsRef.current.left = false;
                }}
                onMoveRightStart={() => {
                  controlsRef.current.right = true;
                }}
                onMoveRightEnd={() => {
                  controlsRef.current.right = false;
                }}
                onFire={() => setInvadersState(fireBullet)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function unlockSite(setUnlocked: (value: boolean) => void) {
  window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
  setUnlocked(true);
}

function startDinoGame(): DinoState {
  return {
    ...createDinoState(),
    phase: "running",
    message: "Run started. Stay light on the jump timing.",
  };
}

function handleDinoJump(
  setDinoState: React.Dispatch<React.SetStateAction<DinoState>>
) {
  setDinoState((current) => {
    if (current.phase === "idle" || current.phase === "lost") {
      return {
        ...startDinoGame(),
        playerY: 14,
        velocity: 8.5,
      };
    }

    if (current.phase !== "running" || current.playerY > 0) {
      return current;
    }

    return {
      ...current,
      playerY: 14,
      velocity: 8.5,
    };
  });
}

function startInvadersGame(): InvadersState {
  return {
    ...createInvadersState(),
    phase: "running",
    message: "Defend the gate. Clear every invader to unlock the site.",
  };
}

function fireBullet(current: InvadersState): InvadersState {
  if (current.phase === "idle" || current.phase === "lost") {
    return {
      ...startInvadersGame(),
      bullets: [{ id: 0, x: 50, y: 84 }],
      bulletId: 1,
      shotCooldown: 5,
    };
  }

  if (current.phase !== "running" || current.shotCooldown > 0) {
    return current;
  }

  return {
    ...current,
    bullets: [
      ...current.bullets,
      { id: current.bulletId, x: current.shipX, y: 84 },
    ],
    bulletId: current.bulletId + 1,
    shotCooldown: 5,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function DinoPanel({
  state,
  onStart,
  onJump,
  onReset,
}: {
  state: DinoState;
  onStart: () => void;
  onJump: () => void;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Dino Run
          </div>
          <div className="mt-2 text-[13px] leading-6 text-zinc-400">
            {state.message}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
            Score
          </div>
          <div className="mt-1 text-2xl font-black text-white">{state.score}</div>
        </div>
      </div>

      <div className="relative mt-6 h-[320px] overflow-hidden border border-zinc-900 bg-[linear-gradient(180deg,#0b0b0b_0%,#090909_50%,#050505_100%)]">
        <div className="absolute inset-x-0 bottom-12 border-t border-dashed border-zinc-800" />
        <div
          className="absolute bottom-12 left-[12%] h-10 w-10 border border-zinc-700 bg-zinc-200 transition-transform duration-75"
          style={{ transform: `translateY(${-state.playerY}px)` }}
        />
        <div
          className="absolute bottom-12 border border-emerald-700 bg-emerald-400/20"
          style={{
            left: `${state.obstacleX}%`,
            width: `${state.obstacleWidth}%`,
            height: "42px",
          }}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onStart}
          className="border border-zinc-700 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-200 transition hover:border-zinc-500 hover:text-white"
        >
          Start run
        </button>
        <button
          type="button"
          onClick={onJump}
          className="border border-zinc-900 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          Jump
        </button>
        <button
          type="button"
          onClick={onReset}
          className="border border-zinc-900 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function InvadersPanel({
  state,
  onStart,
  onReset,
  onMoveLeftStart,
  onMoveLeftEnd,
  onMoveRightStart,
  onMoveRightEnd,
  onFire,
}: {
  state: InvadersState;
  onStart: () => void;
  onReset: () => void;
  onMoveLeftStart: () => void;
  onMoveLeftEnd: () => void;
  onMoveRightStart: () => void;
  onMoveRightEnd: () => void;
  onFire: () => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Space Invaders
          </div>
          <div className="mt-2 text-[13px] leading-6 text-zinc-400">
            {state.message}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
            Hits
          </div>
          <div className="mt-1 text-2xl font-black text-white">{state.score}</div>
        </div>
      </div>

      <div className="relative mt-6 h-[320px] overflow-hidden border border-zinc-900 bg-[radial-gradient(circle_at_top,#101624_0%,#050505_65%)]">
        {state.invaders.map((invader) =>
          invader.alive ? (
            <div
              key={invader.id}
              className="absolute h-5 w-8 border border-emerald-600 bg-emerald-400/20"
              style={{
                left: `${invader.x + state.formationOffsetX}%`,
                top: `${invader.y + state.formationOffsetY}%`,
              }}
            />
          ) : null
        )}

        {state.bullets.map((bullet) => (
          <div
            key={bullet.id}
            className="absolute h-4 w-1 bg-zinc-100"
            style={{ left: `${bullet.x}%`, top: `${bullet.y}%` }}
          />
        ))}

        <div
          className="absolute bottom-[6%] h-5 w-10 border border-zinc-200 bg-zinc-100/15"
          style={{ left: `${state.shipX}%`, transform: "translateX(-50%)" }}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onStart}
          className="border border-zinc-700 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-200 transition hover:border-zinc-500 hover:text-white"
        >
          Start wave
        </button>
        <button
          type="button"
          onClick={onReset}
          className="border border-zinc-900 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          Reset
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          onMouseDown={onMoveLeftStart}
          onMouseUp={onMoveLeftEnd}
          onMouseLeave={onMoveLeftEnd}
          onTouchStart={onMoveLeftStart}
          onTouchEnd={onMoveLeftEnd}
          className="border border-zinc-900 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          Move left
        </button>
        <button
          type="button"
          onMouseDown={onMoveRightStart}
          onMouseUp={onMoveRightEnd}
          onMouseLeave={onMoveRightEnd}
          onTouchStart={onMoveRightStart}
          onTouchEnd={onMoveRightEnd}
          className="border border-zinc-900 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          Move right
        </button>
        <button
          type="button"
          onClick={onFire}
          className="border border-zinc-900 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          Fire
        </button>
      </div>
    </div>
  );
}
