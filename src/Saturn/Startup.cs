using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace Saturn
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }
        // This method gets called by the runtime. 
        //Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IHostingEnvironment environment)
        {
            app.UseIISPlatformHandler();
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseRuntimeInfoPage();

            app.UseFileServer();

            app.UseMvc(ConfigureRoutes);

            app.Run(async (context) =>
            {
             
                await context.Response.WriteAsync("Hello World!");
            });
        }

        private void ConfigureRoutes(IRouteBuilder routeBuilder)
        {
            routeBuilder.MapRoute("Default",
                "{controller=Home}/{action=Index}/{id?}");
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
