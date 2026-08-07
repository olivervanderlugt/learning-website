import type { Lesson } from '../../types'

export const toolShellLesson: Lesson = {
  nodeId: 'tool-shell',
  screens: [
    {
      kind: 'explain',
      title: 'The window behind the windows',
      body: [
        'Every graphical app is a friendly face painted over commands. The SHELL is the raw version: a text prompt where you type a command, press Enter, and the operating system does it — then waits for the next one.',
        'You already know this rhythm. It is a REPL, exactly like Python’s `>>>` prompt, except each line commands the whole computer instead of one interpreter: read a line, run it, print the result, loop.',
        'Open your terminal now (macOS: Terminal.app; the prompt usually ends in `$` or `%`). Everything in this lesson you type there — make a throwaway `practice` folder first so nothing important is at risk.',
      ],
      deeper: [
        'Why bother, when the mouse works? Because the shell is FASTER and REPEATABLE for the things engineers do all day: rename 200 files, search a million lines of logs, chain three tools together, do the exact same setup on your laptop and on the robot. A clicked action happens once and vanishes; a typed command can be saved, shared, and re-run forever.',
        'The specific program reading your keystrokes is itself just a program — usually `bash` or `zsh`. macOS defaults to `zsh` these days; the basics in this lesson (`pwd`, `ls`, `cd`, pipes, `grep`) are identical in both, which is why they are worth learning once and using everywhere, including inside the robot over SSH.',
      ],
    },
    {
      kind: 'explain',
      title: 'Where am I? Moving around',
      body: [
        'The shell is always sitting IN one folder — the “working directory”. Three commands are your whole map: `pwd` prints where you are, `ls` lists what’s here, `cd` changes folder.',
        'Paths come in two flavours. An ABSOLUTE path starts from the root `/` and is unambiguous (`/Users/ada/robot`). A RELATIVE path is read from where you already are: `logs` means the logs folder inside here, `..` means the parent folder, `.` means here.',
        'Try it: `pwd`, then `ls`, then `cd` into a folder and `pwd` again to watch the location change.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You start in `/home/ada/robot`. You run these three commands:\n\n```\ncd logs\npwd\ncd ..\npwd\n```\n\nWhat do the two `pwd` lines print?',
      options: [
        '/home/ada/robot/logs  then  /home/ada/robot',
        '/home/ada/robot  then  /home/ada/robot/logs',
        '/home/ada/robot/logs  then  /home/ada  (`..` jumps to home)',
        'An error — you cannot use `..` as a path',
      ],
      correctIndex: 0,
      reveal:
        '`cd logs` is a relative move DOWN into the logs folder, so the first `pwd` prints `/home/ada/robot/logs`. `..` means “the parent folder”, so `cd ..` climbs back up exactly one level to `/home/ada/robot`. `..` always steps up by one, never all the way home — that’s what `cd ~` (or plain `cd`) does.',
    },
    {
      kind: 'explain',
      title: 'Making, copying, moving — and the delete with no undo',
      body: [
        'Four commands build and rearrange files: `mkdir logs` makes a folder, `cp a.txt b.txt` copies (original stays), `mv a.txt b.txt` moves or renames (original is gone), and `rm a.txt` deletes.',
        'Here is the one that bites everyone: `rm` does NOT move things to a Trash you can fish them back out of. It unlinks the file immediately and permanently — there is no undo, no recycle bin, no “are you sure?”.',
        '`rm -r folder` deletes a whole folder and everything inside it. Treat every `rm` the way you’d treat scissors near a cable: read the line twice before you press Enter.',
      ],
      deeper: [
        'The professional habit isn’t “be more careful”, it’s “make mistakes cheap”. Work inside version control (the next lesson) so a wrong `rm` on a tracked file is one `git checkout` away from coming back. Keep real work in folders that are backed up. And when a command is destructive and wildcarded (`rm *.txt`), run the harmless version first — `ls *.txt` — to SEE exactly what the wildcard matches before you hand that same list to `rm`.',
      ],
    },
    {
      kind: 'predict',
      question:
        'In your practice folder you have `notes.txt` (the only copy). You run:\n\n```\nrm notes.txt\n```\n\n…then immediately realise you needed it. What is the situation?',
      options: [
        'It’s gone for good — `rm` deletes immediately with no Trash and no undo',
        'It’s in the Trash/Recycle Bin; drag it back out',
        'Press Ctrl-Z in the terminal to undo the last command',
        'It’s fine — `rm` only marks files and a reboot restores them',
      ],
      correctIndex: 0,
      reveal:
        '`rm` unlinks the file on the spot; there is no Trash layer and no built-in undo, so the only copy is now gone. This is exactly why engineers keep their work under version control and backups — not because they never mistype, but so that when they do, the file is recoverable from somewhere else. (Don’t run this one on anything you care about; picture it, don’t do it.)',
    },
    {
      kind: 'explain',
      title: 'Pipes and redirection: plumbing for programs',
      body: [
        'Each command prints its output to the screen by default. Two symbols re-route that stream. `>` sends output into a FILE instead (overwriting it); `>>` APPENDS to the file instead of overwriting.',
        'The pipe `|` is the star: it feeds one command’s output straight into the next command’s input. `ls | grep log` runs `ls`, then hands its listing to `grep`, which keeps only the lines containing “log”.',
        'This is function composition made physical — small single-purpose tools bolted together. Try `ls > listing.txt` then `cat listing.txt` to see the redirect, then `cat listing.txt | grep t` to see the pipe.',
      ],
      deeper: [
        'The reason a handful of tiny tools beats one giant program is the “Unix philosophy”: each command does ONE thing well and speaks the same universal format — lines of text. Because every tool reads text and writes text, any tool’s output can become any other tool’s input, so `|` lets you assemble a bespoke one-off program on the fly: `cat robot.log | grep ERROR | wc -l` counts the error lines and did not require anyone to write a “count errors in a log” app.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You run these four commands in order:\n\n```\necho "line A" > out.txt\necho "line B" > out.txt\necho "line C" >> out.txt\ncat out.txt\n```\n\nWhat does `cat` show?',
      options: [
        'line B\nline C',
        'line A\nline B\nline C',
        'line C',
        'line A\nline C',
      ],
      correctIndex: 0,
      reveal:
        'The first `>` writes “line A”, but the second `>` OVERWRITES the whole file with “line B” — “line A” is gone. Then `>>` APPENDS “line C” below it. So the file ends up as “line B” then “line C”. The trap is treating `>` like `>>`: a single `>` always truncates the file first, which is how people accidentally erase a file by redirecting into it twice.',
    },
    {
      kind: 'predict',
      question:
        'A file `day1.txt` contains exactly these three lines:\n\n```\nbattery 80\nbattery 60\nmotor ok\n```\n\nWhat does `grep battery day1.txt` print?',
      options: [
        'battery 80\nbattery 60',
        'All three lines — grep shows the whole file',
        'motor ok',
        'The number 2',
      ],
      correctIndex: 0,
      reveal:
        '`grep PATTERN file` prints every LINE that contains the pattern — here the two lines with “battery”, and not the “motor ok” line. It filters lines, it doesn’t count them (that’s `grep -c`, which would print `2`) and it doesn’t show the whole file. This one habit — “search a big text file for the lines that matter” — is most of what a terminal is for day to day.',
    },
    {
      kind: 'explain',
      title: 'What even IS a command? The PATH',
      body: [
        'When you type `grep`, the shell doesn’t know magic — `grep` is a real program in a file somewhere. The shell finds it by walking a list of folders called the PATH and running the first `grep` it finds. `which grep` shows the winner (often `/usr/bin/grep`).',
        'A few commands (`cd`, `pwd`) are “builtins” baked into the shell itself rather than separate files; `type cd` reports `cd is a shell builtin`.',
        'This is the same PATH the Python lesson’s virtual environment tweaked — activating a venv just puts its folder FIRST on PATH so its `python` is the one found. Run `which python3` to see which one wins right now.',
      ],
      deeper: [
        'PATH is a plain colon-separated string of folders (`echo $PATH` prints it). “Command not found” almost always means the program isn’t installed OR its folder isn’t on PATH — not that the command is misspelled. This is why installing a tool sometimes isn’t enough: if it landed in a folder that isn’t on your PATH, the shell can’t find it, and the fix is to add that folder to PATH rather than to reinstall. Order matters too: the FIRST match wins, which is exactly the lever a venv (and the robot’s own setup scripts) pull.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is a shell, most precisely?',
      options: [
        'A read–eval–print loop for the operating system: you type a command, it runs it, and it waits for the next',
        'A programming language that only works on Linux',
        'The graphical desktop with its windows and icons',
        'A single program named `grep` that searches files',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the shell reads a command line, has the OS execute it, shows the result, and loops — the same REPL rhythm as Python’s prompt, one level up.',
        'Shells run on macOS, Linux, and (via tools) Windows, and the same basics work across them; it’s an interactive command interpreter, not a Linux-only language.',
        'That’s the GUI — the friendly face over the machine. The shell is the text prompt underneath it.',
        '`grep` is one command you can run FROM a shell; the shell is the prompt that runs commands, not any single one of them.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the difference between an absolute path and a relative path?',
      options: [
        'Absolute starts from root `/` and is unambiguous; relative is read from the current working directory',
        'Absolute paths are for files, relative paths are for folders',
        'They’re the same — the shell picks whichever it likes',
        'Relative paths start with `/`, absolute paths never do',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `/home/ada/robot` means the same thing from anywhere, while `logs` or `..` only make sense relative to where the shell currently is.',
        'Both kinds address files OR folders equally — the difference is the starting point, not what they point at.',
        'They resolve to different places depending on your working directory; the shell follows a strict rule, it doesn’t guess.',
        'Backwards: an ABSOLUTE path starts with `/` (the root); a relative one (`logs`, `..`, `.`) does not.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You run `rm data.csv` and immediately regret it. What is true on a normal terminal?',
      options: [
        'The file is deleted permanently — `rm` has no Trash and no undo, so recovery means a backup or version control',
        'It’s safely in the Trash; restore it with a click',
        'The terminal keeps a one-step undo you can trigger with Ctrl-Z',
        '`rm` never deletes; it only hides files until you empty them later',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `rm` unlinks immediately with no recycle bin. The safety net is elsewhere — a backup, or the file being tracked in git — which is the whole reason those habits exist.',
        'The graphical Trash is a feature of the file manager, not of `rm`; the command bypasses it entirely.',
        'Ctrl-Z in a terminal suspends the running program; it does not resurrect a deleted file.',
        '`rm` really removes — the confusion with “mark and empty later” is the desktop Trash, which `rm` doesn’t use.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the difference between `>` and `>>` when redirecting a command’s output to a file?',
      options: [
        '`>` overwrites the file from scratch; `>>` appends to whatever is already there',
        'They’re identical; `>>` is just older spelling',
        '`>` appends and `>>` overwrites — it’s the reverse',
        '`>` writes to a file and `>>` writes to two files at once',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a single `>` truncates the file to empty and then writes; `>>` keeps the existing contents and adds the new output at the end.',
        'They behave differently on every run — mixing them up is how people erase a file by redirecting into it a second time.',
        'Backwards: one arrow replaces, two arrows add on.',
        'Both write to exactly one target file; the number of arrows controls overwrite-vs-append, not the number of files.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does the pipe do in `cat robot.log | grep ERROR`?',
      options: [
        'It feeds `cat`’s output straight into `grep` as its input, so grep filters the log to the ERROR lines',
        'It runs the two commands at unrelated times with no connection between them',
        'It saves `cat`’s output into a file called `grep`',
        'It compares the two files `cat` and `grep`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `|` connects one program’s output stream to the next program’s input, so you compose small tools into a custom pipeline on the spot.',
        'The whole point of `|` is the connection — the left command’s output becomes the right command’s input, in one flow.',
        'Saving to a file is `>`; `grep` here is a command being run, not a filename.',
        'Neither `cat` nor `grep` is a file here — both are commands, joined by the pipe.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You type `rosrun` and the shell says “command not found”, but you’re sure it’s installed. What’s the most likely cause?',
      options: [
        'The folder containing `rosrun` isn’t on your PATH, so the shell can’t find the program to run',
        'The command is spelled correctly, so it must be a hardware fault',
        'Files can never be run from a terminal',
        '`rosrun` has to be typed in uppercase',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the shell only runs programs it can find by walking PATH. If the install landed somewhere not on PATH, add that folder to PATH (or activate the environment that does) — reinstalling won’t help.',
        '“Command not found” is a lookup failure in software, not a hardware issue — the program file simply wasn’t found on PATH.',
        'Terminals run programs constantly; that’s their job. The issue is locating this particular one.',
        'Shell commands are case-sensitive but that’s not it — the message means the name wasn’t found on PATH at all.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Which command prints the folder you are currently sitting in?',
      options: [
        '`pwd`',
        '`ls`',
        '`cd`',
        '`mkdir`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `pwd` (“print working directory”) reports your current location.',
        '`ls` lists the CONTENTS of the current folder, not the path to it.',
        '`cd` with no argument moves you home; it doesn’t print where you are.',
        '`mkdir` creates a new folder; it doesn’t report your location.',
      ],
    },
    {
      question: 'You want to keep the original file AND have a second copy under a new name. Which command?',
      options: [
        '`cp old.txt new.txt`',
        '`mv old.txt new.txt`',
        '`rm old.txt new.txt`',
        '`cd old.txt new.txt`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `cp` copies, leaving the original in place alongside the new copy.',
        '`mv` renames/moves — the original name disappears, so you end up with one file, not two.',
        '`rm` deletes; you’d lose the file, not copy it.',
        '`cd` changes directory and doesn’t operate on files like this.',
      ],
    },
    {
      question: 'What does `ls | grep .txt | wc -l` do, read left to right?',
      options: [
        'Lists the folder, keeps only lines containing “.txt”, then counts those lines',
        'Deletes every .txt file and reports how many were removed',
        'Renames all files to end in .txt',
        'Opens each .txt file in an editor',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `ls` produces the listing, `grep .txt` filters to lines mentioning .txt, and `wc -l` counts the surviving lines — three tools composed with pipes.',
        'Nothing here deletes; `ls`, `grep`, and `wc` only read and report.',
        'None of these commands renames files; `grep` filters text, it doesn’t modify names.',
        'No editor is involved — `wc -l` just counts lines.',
      ],
    },
    {
      question: 'After `echo "a" > log.txt` then `echo "b" >> log.txt`, what does `log.txt` contain?',
      options: [
        'Two lines: `a` then `b`',
        'One line: `b` (the second write replaced the first)',
        'One line: `a`',
        'Nothing — the two redirects cancel out',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `>` writes “a”, then `>>` appends “b” below it, leaving both lines.',
        'That would be true if the second command used a single `>`; `>>` appends instead of overwriting.',
        '`>>` added a second line, so “a” is not alone.',
        'Redirects don’t cancel — each one wrote to the file.',
      ],
    },
    {
      question: 'The shell says a program is `not found` even though you installed it. `which` prints nothing for it. What does that tell you?',
      options: [
        'Its folder isn’t on PATH, so the shell has nowhere to find it — fix the PATH (or activate its environment)',
        'The program is running fine and this is just a warning',
        'You must delete and reinstall your entire shell',
        'The program can only be launched by double-clicking, never from a terminal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `which` searches PATH and found nothing, which means the shell can’t locate the executable — the folder it lives in needs to be on PATH.',
        '“Not found” means it did not run at all; nothing is executing.',
        'The shell is fine; the issue is PATH not including the program’s folder.',
        'Plenty of programs run from a terminal — this one just can’t be found on PATH yet.',
      ],
    },
  ],
}
