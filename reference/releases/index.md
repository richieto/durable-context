# Reference Release Index

One row per tagged release. Tag names default to `release/vMAJOR_MINOR_PATCH`
unless the project documents a different convention.

Reference at a given tag describes the behavior of that release.

| Tag | Date | Areas refreshed | Owner | Summary |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | First documentation refresh. |

## Notes For Future Release Rows

- For an explicit baseline documentation pass, the tag may be a commit,
  branch, date, or human-named baseline label when no release tag exists yet.
- The first row may be a bootstrap refresh. Subsequent rows should describe
  incremental refreshes from `<previous-tag>..HEAD`.
- "Areas refreshed" lists only areas with material behavior changes.
- Keep the summary to one sentence. Link to an area or feature doc when a
  change deserves more space.
