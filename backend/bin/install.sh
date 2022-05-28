set -a # automatically export all variables
source .env
set +a


npm install express nodemon cookie-parser cors
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
npm install dotenv bcrypt  jsonwebtoken validator mongoose


touch .babelrc
echo "{
    "presets": ["@babel/preset-env"]
}" >> .babelrc
