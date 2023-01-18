module.exports = {
  ci: {
    collect: {
      numberOfRuns: 2,
      settings: {
        skipAudits: ["is-on-https"],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.6 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "categories:pwa": "off",
      },
    },
  },
};
