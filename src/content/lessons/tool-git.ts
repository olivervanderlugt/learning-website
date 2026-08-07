import type { Lesson } from '../../types'

export const toolGitLesson: Lesson = {
  nodeId: 'tool-git',
  screens: [
    {
      kind: 'explain',
      title: 'The final_final_v2_REALLY problem',
      body: [
        'Every beginner invents the same broken backup system: `essay.doc`, `essay_v2.doc`, `essay_final.doc`, `essay_final_REALLY.doc`. It doesn’t scale, it can’t tell you WHAT changed between versions, and two people editing at once is chaos.',
        'VERSION CONTROL solves this properly. Git records named SNAPSHOTS of your whole project over time, lets you see exactly what changed, jump back to any past state, and merge two people’s work — all without a wall of copied folders.',
        'If Git isn’t installed, `git --version` will tell you; on macOS running it once may offer to install the developer tools. Then make a throwaway `practice-repo` folder to run every command in this lesson.',
      ],
      deeper: [
        'The mental model that makes Git click: a repository is a TIMELINE of snapshots, not a pile of diffs. Each commit stores the state of the whole project at that moment (Git is clever about not duplicating unchanged files under the hood, but you should think “full snapshot”). Because every snapshot is kept, “go back to how it was on Tuesday” and “what exactly did this change break” are cheap, exact operations — the opposite of a folder full of near-identical copies where you can only guess what differs.',
      ],
    },
    {
      kind: 'explain',
      title: 'Three commands to your first snapshot',
      body: [
        '`git init` turns the current folder into a repository (it creates a hidden `.git` folder that holds the whole history). You do this once per project.',
        'A snapshot takes two steps, and the middle one trips everyone up. `git add file` STAGES a change — puts it on a loading dock of things to include. `git commit -m "message"` then seals everything staged into one permanent snapshot with a note.',
        '`git status` is your most-used command: it shows what’s changed, what’s staged, and what isn’t. Run it constantly — before and after every add and commit — to see the machine’s view of your work.',
      ],
      deeper: [
        'Why the staging step at all, instead of committing every change at once? Because it lets you compose a commit deliberately. You might have edited five files but only two belong to “fix the battery bug”; you `git add` just those two, commit them with that message, then stage and commit the rest separately. The result is a history where each snapshot is one coherent idea with an honest message — which is what makes the timeline searchable later instead of a dumping ground.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Fresh repo. You create `robot.py`, then run `git status` WITHOUT adding it. Git prints a section headed “Untracked files”. What does that mean?',
      options: [
        'Git sees the file exists but isn’t recording it yet — you must `git add` it to start tracking',
        'The file is already saved in a commit and safe',
        'The file is staged and ready to commit',
        'Git has deleted the file because it wasn’t added in time',
      ],
      correctIndex: 0,
      reveal:
        '“Untracked” means the file is in your folder but Git isn’t versioning it — it’s outside the timeline until you `git add` it. Nothing is saved and nothing is lost; Git is just reporting “I can see this, but you haven’t told me to watch it.” The next step is `git add robot.py` (moves it to staged), then `git commit` (seals it into history).',
    },
    {
      kind: 'predict',
      question:
        'In a repo with one commit, you edit `robot.py` and add a line. Before staging, you run `git diff`. Git shows the line prefixed with `+`:\n\n```\n@@ -1 +1,2 @@\n print(1)\n+print(2)\n```\n\nWhat is `git diff` telling you?',
      options: [
        'Exactly what changed since the last snapshot: one line, `print(2)`, was added',
        'That `print(2)` was deleted from the file',
        'That the file now has an error on line 2',
        'That the change is already committed to history',
      ],
      correctIndex: 0,
      reveal:
        '`git diff` shows the difference between your working file and the last snapshot, line by line. A `+` prefix means an ADDED line; a `-` would mean a removed one. Here it’s reporting that `print(2)` is new since the last commit — this is the answer to “what exactly did I change?”, the question a folder of `_v2` copies can never cleanly answer.',
    },
    {
      kind: 'explain',
      title: 'Time travel: log and checkout',
      body: [
        '`git log` lists your commits newest-first; `git log --oneline` shows the compact form — a short id and the message for each snapshot, the readable spine of your project’s history.',
        'Each commit has a unique id (a hash like `135ae5c`). `git checkout <id>` sends your files back to exactly how they were at that snapshot — the actual time machine. `git checkout <file>` throws away un-committed edits to one file, restoring it from the last commit.',
        'That second form is the safety net the shell lesson promised: a tracked file you mangled (or even `rm`-ed) is one `git checkout` away from returning, because the snapshot still holds it.',
      ],
    },
    {
      kind: 'explain',
      title: 'Branches: parallel universes',
      body: [
        'A BRANCH is an independent line of development — a parallel universe of your project. You split off with `git switch -c feature` (older Git: `git checkout -b feature`), do risky work there, and `main` stays untouched and shippable the whole time.',
        'Commits you make on `feature` simply don’t exist on `main` until you MERGE. `git switch main` then `git merge feature` folds the feature’s snapshots into main, combining both lines of work.',
        'Try it: on a `feature` branch add a line and commit, switch back to `main`, and `cat` the file — your feature line is absent. Merge, and it appears. That is branching in one experiment.',
      ],
      deeper: [
        'Branches are why a team doesn’t descend into chaos. Everyone works on their own branch off `main`, so half-finished work never breaks the version that ships; when a feature is done and reviewed, it merges in. If two branches changed the SAME lines, merging produces a “merge conflict” — Git marks the clashing region and asks a human to choose, rather than silently guessing. It sounds scary but it’s just Git refusing to lose anyone’s work without asking.',
      ],
    },
    {
      kind: 'predict',
      question:
        'On `main`, `robot.py` has 2 lines. You run `git switch -c feature`, add a third line, and `git commit`. Then you run `git switch main` and `cat robot.py`. How many lines does it show?',
      options: [
        '2 — the third line lives only on `feature`; `main` is untouched until you merge',
        '3 — commits are global, so every branch sees them immediately',
        '0 — switching branches wipes the file',
        'An error — you can’t switch branches once you’ve committed',
      ],
      correctIndex: 0,
      reveal:
        'A commit belongs to the branch you made it on. Your third line was committed on `feature`, so on `main` the file is still its 2-line self — the two branches are genuinely separate timelines. Run `git merge feature` from `main` and the third line appears, because merging is what carries `feature`’s snapshots into `main`. This isolation is exactly why teams branch: unfinished work can’t break the shippable branch.',
    },
    {
      kind: 'explain',
      title: 'Sharing: GitHub, push and pull',
      body: [
        'Everything so far is LOCAL — the history lives only on your machine. A REMOTE (GitHub is the popular host) is a shared copy of the repo in the cloud that teammates — and the robot — can reach.',
        '`git push` uploads your new local commits to the remote; `git pull` downloads commits others have added and merges them into your branch. Push to share your work, pull to receive theirs.',
        'This is how robot code actually ships: you commit and push from your laptop, and the robot (or a teammate, or a CI server) pulls the exact same snapshots — no zipped folders, no “which version is on the robot?” guessing.',
      ],
      deeper: [
        'GitHub adds a social layer on top of plain Git: a Pull Request is a proposal to merge your branch, where teammates review the diff and comment before it lands on `main`. That review gate is why shared robot codebases don’t rot — no change reaches the branch that runs on real hardware without a second pair of eyes and a green test run. The Git commands are the engine; the PR workflow is the seatbelt.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What problem does version control actually solve?',
      options: [
        'It keeps named snapshots of a project over time, shows exactly what changed, and lets people merge work — replacing folders of `_final_v2` copies',
        'It makes your code run faster at execution time',
        'It automatically fixes bugs in your code',
        'It encrypts your source so no one can read it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: history, exact diffs, time travel, and merging — the things a pile of copied folders can never do cleanly.',
        'Version control doesn’t touch runtime speed; it manages the history of the code, not its performance.',
        'Git records what you change; it has no idea whether a change is a bug or a fix — that’s still your job.',
        'A normal Git repo stores source in plain text; encryption is a separate concern entirely.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does `git add` do, and how is it different from `git commit`?',
      options: [
        '`git add` stages a change (marks it for the next snapshot); `git commit` seals everything staged into a permanent snapshot',
        '`git add` uploads to GitHub; `git commit` saves locally',
        'They’re the same command with two spellings',
        '`git add` deletes files; `git commit` restores them',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: add puts changes on the staging “loading dock”; commit packages what’s staged into one recorded snapshot with a message.',
        'Neither touches GitHub — uploading is `git push`. Both `add` and `commit` are local steps.',
        'They’re two distinct steps: staging, then committing. The staging step is what lets you choose exactly what goes into a commit.',
        'Neither deletes files; `add` stages and `commit` records.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a fresh repo, `git status` lists your new file under “Untracked files”. What does that tell you?',
      options: [
        'Git can see the file but isn’t versioning it yet — you must `git add` it to start tracking',
        'The file is already committed and safe in history',
        'The file is corrupted',
        'Git will commit the file automatically on the next status check',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “untracked” means outside the timeline — visible to Git but not being recorded until you `git add` it.',
        'Committed files don’t show as untracked; they show as clean (or as modified once you edit them).',
        'Untracked says nothing about the file’s health — only that Git isn’t watching it yet.',
        '`git status` only reports; it never commits anything on its own.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You committed a new feature on a branch called `feature`. On `main`, that work is missing. How do you bring it into `main`?',
      options: [
        'Switch to `main` and run `git merge feature` to fold the branch’s commits in',
        'Delete `main` and rename `feature` to `main`',
        'Run `git add` again on `main`',
        'Nothing — commits on any branch appear on every branch automatically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: merging is exactly the operation that carries one branch’s snapshots into another; from `main`, `git merge feature` integrates the work.',
        'Deleting `main` would throw away its history and is never the intended workflow — merge combines the two lines instead.',
        '`git add` stages new edits; it does nothing to pull in another branch’s existing commits.',
        'Branches are isolated on purpose — a commit stays on its branch until you merge it elsewhere.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You edited `robot.py` but haven’t committed. Which command shows exactly which lines you changed since the last snapshot?',
      options: [
        '`git diff` — it prints the line-by-line difference from the last commit, with `+`/`-` markers',
        '`git init` — it shows recent changes',
        '`git push` — it lists your edits',
        '`git log` — it prints the full text of every changed line',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git diff` compares your working file to the last commit and marks added lines with `+`, removed with `-`.',
        '`git init` creates a repository; it doesn’t report changes.',
        '`git push` uploads commits to a remote; it doesn’t show your line edits.',
        '`git log` lists the history of commits (ids and messages), not the specific lines you just changed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What do `git push` and `git pull` do?',
      options: [
        '`push` uploads your local commits to a shared remote; `pull` downloads and merges others’ commits from it',
        'They’re local-only commands that never touch a remote',
        '`push` deletes history; `pull` restores it',
        '`push` commits your changes; `pull` stages them',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: they’re the sync pair with a remote like GitHub — push to share your work, pull to receive theirs. It’s how the same snapshots reach a teammate or the robot.',
        'Their entire job is talking to the remote; that’s what distinguishes them from `commit` and `add`.',
        'Neither destroys history — push adds your commits to the remote, pull brings remote commits to you.',
        'Committing is `git commit` and staging is `git add`; push/pull move commits between your machine and the remote.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Which command turns the current folder into a new Git repository?',
      options: [
        '`git init`',
        '`git commit`',
        '`git status`',
        '`git clone`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git init` creates the hidden `.git` folder and starts tracking history for this folder.',
        '`git commit` records a snapshot — but only once the repo already exists.',
        '`git status` reports state; it doesn’t create a repository.',
        '`git clone` copies an EXISTING remote repo; `git init` starts a brand-new one from scratch.',
      ],
    },
    {
      question: 'You want to save a snapshot of your currently staged work with a note. Which command?',
      options: [
        '`git commit -m "message"`',
        '`git add .`',
        '`git diff`',
        '`git log`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git commit -m "..."` seals the staged changes into a permanent snapshot with your message.',
        '`git add .` stages changes but doesn’t record a snapshot yet.',
        '`git diff` shows what changed; it doesn’t save anything.',
        '`git log` lists past commits; it doesn’t make a new one.',
      ],
    },
    {
      question: 'What is a branch, in one sentence?',
      options: [
        'An independent line of development where commits stay separate until merged',
        'A backup copy of a single file',
        'A permanent deletion of old commits',
        'The remote server that hosts your code',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a branch is a parallel timeline; work on it doesn’t affect other branches until you merge.',
        'A branch covers the whole project’s history, not one file, and it isn’t a static backup.',
        'Branches don’t delete history — they let history fork and later recombine.',
        'The host is the remote (e.g. GitHub); a branch is a line of development within a repo.',
      ],
    },
    {
      question: 'You mangled a tracked file and haven’t committed the mess. How do you get the last committed version back?',
      options: [
        '`git checkout <file>` — restore it from the last snapshot',
        '`git push` — upload the mangled file',
        '`git init` — start over',
        'You can’t; the good version is lost',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git checkout <file>` discards un-committed edits and restores the file from the last commit — the safety net of tracking your work.',
        '`git push` would only share the broken state; it doesn’t restore anything.',
        '`git init` re-initialises a repo; it doesn’t recover a file.',
        'It’s very much recoverable — the last snapshot still holds the good version, which is the whole point of committing.',
      ],
    },
    {
      question: 'A teammate pushed new commits to GitHub. What do you run to bring their work into your local branch?',
      options: [
        '`git pull`',
        '`git push`',
        '`git commit`',
        '`git add`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `git pull` downloads the remote’s new commits and merges them into your current branch.',
        '`git push` sends YOUR commits up; it doesn’t fetch theirs.',
        '`git commit` records a local snapshot; it doesn’t contact the remote.',
        '`git add` stages local changes; it has nothing to do with the remote.',
      ],
    },
  ],
}
