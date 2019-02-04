module.exports ={
    devServer:{
        open:true,
        host:"localhost",
        port: 8081,
        hotOnly: false,//热更新
        proxy:{
            //配置跨域
            '/api':{
                target:"http://localhost:8080/",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }

    }
};