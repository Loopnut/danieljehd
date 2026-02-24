# My Store Dashboard

This project fetches products from FakeStoreAPI and displays them in a table. Click a product row to see details in a popup.

Local testing

1. Open `index.html` in your browser by double-clicking the file. If CORS or file restrictions prevent fetch from working, run a simple server:

```powershell
cd "C:\Desktop store"
py -3 -m http.server 8080
# then open http://localhost:8080
```


Deploy to GitHub Pages (automatic via workflow)

1. Create a GitHub repository and push this project to the `main` branch.
2. The workflow file `.github/workflows/deploy.yml` will run on pushes to `main` and publish the repository contents to the `gh-pages` branch using the default `GITHUB_TOKEN`.
3. After the action completes, enable GitHub Pages in repository Settings → Pages, select the `gh-pages` branch (if not already configured). Your site will be available at `https://<username>.github.io/<repo>/`.

Manual Pages setup (alternative)

1. In the repository Settings → Pages, choose `main` branch and `/ (root)` folder and click Save.

Notes

- If you'd like a custom domain, add a `CNAME` file and configure DNS.
- The GitHub Actions workflow uses `peaceiris/actions-gh-pages` which publishes the repository root — adjust `publish_dir` in `.github/workflows/deploy.yml` if needed.
