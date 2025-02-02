import re
import sys

# List of allowed prefixes
ALLOWED_PREFIXES = [
    "build", "chore", "docs", "feat", "fix",
    "perf", "refactor", "revert", "style", "test"
]

def validate_title(title):
    pattern = r"^(" + "|".join(ALLOWED_PREFIXES) + r"): .+"
    if re.match(pattern, title):
        return True, "✅ Title is good!"
    else:
        return False, (
            "❌ Invalid PR title. It should start with one of these prefixes: "
            + ", ".join(ALLOWED_PREFIXES) + "."
        )

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ Error: No title provided. Pass the PR title as an argument.")
        sys.exit(1)

    pr_title = sys.argv[1]
    valid, message = validate_title(pr_title)
    print(message)
    if not valid:
        sys.exit(1)
