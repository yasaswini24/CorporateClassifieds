using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Technovert.Internship.Classifieds.Services.IServices;
using Technovert.Internship.Classifieds.Services.Services;

namespace Technovert.Internship.Classifieds.Services
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });


            //string ConnectionString=Configuration["ConnectionString"];
            //services.AddTransient<IDbConnection>((sp) => new SqlConnection(ConnectionString));
            services.AddSingleton<IUserServices, UserServices>();
            services.AddSingleton<IAdServices, AdServices>();
            services.AddSingleton<IImagesServices, ImagesServices>();
            services.AddSingleton<ICategoryServices, CategoryServices>();
            services.AddSingleton<IAttributeServices, AttributeServices>();
            services.AddSingleton<IOfferServices, OfferServices>();
            services.AddSingleton<IChatServices, ChatServices>();
            services.AddSingleton<IReportServices,ReportServices>();


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors(MyAllowSpecificOrigins);
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
