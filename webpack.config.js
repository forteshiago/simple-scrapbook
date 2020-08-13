const Dotenv = require("dotenv-webpack");
const path = require("path"); //importa o modulo node, caminhos de pastas!

module.exports = {

    entry: path.resolve(__dirname, "src", "index.js"), //dirname variavel global
    output: {
        path: path.resolve(__dirname, "public"), //propriedade nao variavel!
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
    },

    module: { //nao precisa mais do babel
        rules: [ //obrigatoria - regras de como o usuario deve importar novos arquivos js
            //qual loader deve ser usado para carregar o arquivo
            {
                test: /\.js$/, //expressão rular - extensao que queremos
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins:[
        new Dotenv({
            path: path.resolve(__dirname, ".env"),
        })
    ],
};