import type { Lesson } from '../../types'

export const toolsExamLesson: Lesson = {
  nodeId: 'tools-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — the tools of the trade',
      body: [
        'Fourteen fresh questions across the whole Applied Software module — moving around the shell, pipes and redirection, the Git workflow from `init` to `push`, and the web half: HTTP methods and status codes, servers, middleware and API design. Nothing recycled from the lesson quizzes; picture each command or request running, then answer.',
        'Score 80% and the module is sealed. Below that you lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You are in `/home/ada/robot/logs`. You run `cd ../..` and then `pwd`. What prints?',
      options: [
        '/home/ada — `..` steps up one level, and `../..` steps up two',
        '/home/ada/robot — `../..` only goes up one level',
        '/ — any `..` jumps straight to the root',
        '/home/ada/robot/logs — `cd ..` doesn’t change anything',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: from `logs`, one `..` reaches `robot`, the second `..` reaches `ada` — landing in `/home/ada`.',
        'That’s one level; `../..` chains two `..` steps, so it climbs twice.',
        '`..` is always “up exactly one folder”, never a leap to root — that would be `cd /`.',
        '`cd ..` definitely moves you: each `..` climbs one directory toward root.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You have `draft.md` and run `mv draft.md report.md`. Afterwards, which files exist?',
      options: [
        'Only `report.md` — `mv` renames, so `draft.md` no longer exists',
        'Both `draft.md` and `report.md` — `mv` leaves the original',
        'Only `draft.md` — the command fails silently',
        'Neither — `mv` deletes both files',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `mv` moves/renames, so the content now lives under `report.md` and the old name is gone.',
        'That’s `cp`, which copies and keeps the original. `mv` does not leave a second copy.',
        '`mv` succeeds here and renames the file; it doesn’t silently no-op.',
        '`mv` relocates the file to the new name; it doesn’t destroy the data.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You want to save ONLY the lines containing “ERROR” from `robot.log` into a new file `errors.txt`. Which command does it?',
      options: [
        'grep ERROR robot.log > errors.txt',
        'grep ERROR robot.log >> errors.txt each time to overwrite it',
        'errors.txt > grep ERROR robot.log',
        'grep errors.txt > ERROR robot.log',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `grep ERROR robot.log` filters to the ERROR lines, and `>` redirects that output into `errors.txt`.',
        '`>>` appends rather than overwrites, so running it repeatedly would grow the file, not replace it — the opposite of “overwrite”.',
        'Redirection points from a command INTO a file; the file name goes on the right of `>`, not the left.',
        'This searches `robot.log` for the text “errors.txt” and tries to overwrite the pattern — the arguments are scrambled.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A script runs `rm -r build/` on your machine to clean up. What exactly happens to the `build` folder?',
      options: [
        'The folder and everything inside it are deleted permanently — no Trash, no undo',
        'The folder is moved to the Trash where you can restore it',
        'Only empty subfolders inside `build` are removed',
        'Nothing — `rm` refuses to touch folders',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `-r` makes `rm` recurse into the folder and remove it and all its contents, immediately and irreversibly.',
        '`rm` bypasses the graphical Trash entirely; there is nothing to restore from.',
        '`-r` removes the folder AND its files, not just the empty parts.',
        'Plain `rm` won’t delete a folder, but `rm -r` is exactly the flag that lets it — and it deletes everything within.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You activate a Python virtual environment, then run `which python3`. It prints a path inside your project’s `.venv` folder, not `/usr/bin/python3`. Why?',
      options: [
        'PATH is searched in order and the venv put its folder first, so its `python3` is the first match found',
        'The system `python3` was deleted when you made the venv',
        '`which` always prints the newest file on disk',
        'Virtual environments rename the real `python3` to hide it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: activating a venv prepends its folder to PATH, and the shell runs the FIRST matching program it finds — so the venv’s interpreter wins.',
        'The system interpreter is untouched; the venv just gets searched before it.',
        '`which` reports the first hit on PATH, not the newest file anywhere.',
        'Nothing is renamed or hidden — PATH ordering alone decides which one is found first.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You just ran `git add config.yaml`. Before you type `git commit`, is that change recorded in the project’s history?',
      options: [
        'No — it’s only STAGED; it enters history when you `git commit`',
        'Yes — `git add` writes it straight into a permanent snapshot',
        'Yes — staging and committing are the same operation',
        'No — and `git add` also deleted the file',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git add` moves a change onto the staging area (the loading dock). History only gains a snapshot when you `git commit`.',
        '`git add` never records a snapshot by itself; the commit step is what makes it permanent.',
        'They’re deliberately two steps — staging lets you choose exactly what the next commit contains.',
        '`git add` stages the file; it certainly doesn’t delete it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does `git log --oneline` show you?',
      options: [
        'One compact line per past commit — a short id and its message, newest first',
        'The full text of every file in the project',
        'A list of files you have not yet added',
        'The differences between your working file and the last commit',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it’s the readable spine of the history — each snapshot condensed to its short hash and commit message.',
        'It lists commits, not file contents; to see a file you’d open it or check it out.',
        'Untracked/unstaged files are what `git status` reports, not `git log`.',
        'That line-by-line comparison is `git diff`; `git log` lists the commits themselves.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You accidentally overwrote most of `motor.py` (a tracked file) and have NOT committed since. How do you get the last committed version back?',
      options: [
        'git checkout motor.py — restores it from the last snapshot',
        'git commit motor.py — saves the broken version over the good one',
        'git push motor.py — uploads it to fix it',
        'It’s unrecoverable once the file on disk changed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git checkout <file>` discards un-committed edits and restores the file from the most recent commit — the payoff of tracking your work.',
        'Committing now would just record the mangled version; it wouldn’t bring back the good one.',
        '`git push` shares commits with a remote; it can’t repair a local file.',
        'It’s fully recoverable: the last snapshot still holds the good `motor.py`, which is exactly why committing matters.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You and a teammate branch off `main`. You commit three times on your branch; your teammate never sees those commits on `main`. Is something broken?',
      options: [
        'No — branches are isolated by design; your commits reach `main` only when the branch is merged',
        'Yes — every commit should appear on all branches instantly',
        'Yes — committing on a branch corrupts `main`',
        'No — but your commits were silently discarded',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a branch is a separate timeline. Work stays contained until a `git merge` (usually via a reviewed pull request) folds it into `main`.',
        'Global-instant commits would defeat the purpose of branching — isolation is the whole feature.',
        'Committing on a branch leaves `main` untouched; nothing is corrupted.',
        'The commits are safely on your branch, not discarded — they’re just waiting to be merged.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'New robot code is on GitHub. On the robot’s own computer, which command downloads those commits and updates its local branch?',
      options: [
        'git pull — fetches the remote’s new commits and merges them in',
        'git push — sends the robot’s commits up to GitHub',
        'git init — starts a brand-new empty repository',
        'git add — stages local edits for a commit',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git pull` brings the remote’s commits down and merges them into the current branch — how the robot receives the exact snapshots you shipped.',
        '`push` goes the other direction, uploading local commits; it wouldn’t bring the new code down.',
        '`git init` creates a fresh repo and would ignore the existing history entirely.',
        '`git add` only stages local changes; it never talks to the remote.',
      ],
    },
  ],
}
