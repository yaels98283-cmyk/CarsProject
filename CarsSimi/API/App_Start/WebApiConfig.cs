using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // 1. הפעלת CORS ראשונה
            var cors = new EnableCorsAttribute(
                origins: "http://localhost:4200",
                headers: "*",
                methods: "*");
            config.EnableCors(cors);

            // 2. הגדרת Routes לאחר מכן
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
