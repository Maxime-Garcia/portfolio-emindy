# Branch Protection Rules

Configure these rules in GitHub Settings → Branches → Branch protection rules

## Master Branch
- ✅ Require pull request reviews before merging (1 review)
- ✅ Require status checks to pass before merging
- ✅ Dismiss stale pull request approvals
- ✅ Require code owner reviews
- ✅ Require approval of reviews when the head branch updates
- ✅ Include administrators
- ✅ Restrict who can push to matching branches

## Develop Branch
- ✅ Require pull request reviews before merging (1 review)
- ✅ Require status checks to pass before merging
- ✅ Allow force pushes (development only)

## Feature Branches
- No restrictions (fast-moving development)

---

## GitHub Actions Workflows

Create `.github/workflows/ci.yml` for:
- ESLint checks
- TypeScript compilation
- Test execution
- Build verification
- Lighthouse performance audit

---

Generated: 2024-06-23
