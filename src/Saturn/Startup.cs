using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Routing;
using Microsoft.Extensions.DependencyInjection;
//using Saturn.ResourceAccess;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.Extensions.Configuration;
using Saturn.Data;
using Microsoft.Data.Entity;
using Saturn.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using Saturn.Models;

namespace Saturn
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public static IConfigurationRoot Configuration;

        public Startup(IApplicationEnvironment appEnv)
        {
            var builder = new ConfigurationBuilder()
                         .SetBasePath(appEnv.ApplicationBasePath)
                        // .AddJsonFile("config.json")
                        .AddJsonFile("appsettings.json")
                         .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddEntityFramework()
                .AddSqlServer()
              //   .AddDbContext<EduContext>(options=>options.UseSqlServer(Configuration["Data:EduContextConnection"]));
               .AddDbContext<EduContext>(
            //  .AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(Configuration["database:connection"]));

            // services.AddIdentity<User, IdentityRole>()
            //  services.AddIdentity<ApplicationUser, IdentityRole>()
            services.AddIdentity<User, IdentityRole>()
                     .AddEntityFrameworkStores<EduContext>()
            //   .AddEntityFrameworkStores<ApplicationDbContext>()
                     .AddDefaultTokenProviders();
            services.AddMvc();

        }
        // This method gets called by the runtime. 
        //Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IHostingEnvironment environment
          )
        {        

            app.UseIISPlatformHandler();
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseRuntimeInfoPage();

            app.UseFileServer();
            app.UseIdentity();

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
