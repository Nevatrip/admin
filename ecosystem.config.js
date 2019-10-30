const host = process.env.PROJECT_NAME;

module.exports = [{
  name: 'app',
  script: "sanity",
  args: `start ${host ? `--host=${host}` : ''}`,
}]