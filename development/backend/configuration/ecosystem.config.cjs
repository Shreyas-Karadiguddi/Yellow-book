module.exports = {
  apps: [
    {
      name: "yellow-book-server",
      script: "../server.js",
      instances: "max",
      exec_mode: "cluster",
      watch: true,
    },
  ],
};
