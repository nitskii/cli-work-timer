# CLI Work Timer

CLI Work Timer is a simple tool to track time spent working. You then can review the timecards with calculated session (record) & total time.

## Installation

```bash
npm install -g cli-work-timer
```

## Usage

To use the app, run the provided binary with one of the commands listed in the [commands](#commands) section:

```bash
work-timer <command>
```

## Commands

- `check-in [time]` - check in at current time or at specified if provided\*
- `check-out [time]` - check out at current time or at specified if provided\*
- `today` - show today's timecard info
- `week` - show current week's timecards info
- `month` - show current month's timecards info

\* The supported time format is H:mm (e.g. 15:37, 8:15, ...).
