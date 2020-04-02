using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace StoryBrowser.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoryController : Controller
    {
        private readonly ILogger<StoryController> _logger;
        public StoryController(ILogger<StoryController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        public async Task<IEnumerable<Story>> GetAsync()
        {
            List<String> ids = new List<String>();
            List<Story> stories = new List<Story>();
            using (var httpClient = new System.Net.Http.HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://hacker-news.firebaseio.com/v0/topstories.json"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    ids = JsonConvert.DeserializeObject<List<string>>(apiResponse);
                }
            }
            int i = 0;
            foreach(string id in ids)
            {
                if (i > 10) return stories;
                var story = await GetStoryDetail(id);
                stories.Add(story);
                i++;

            }
            return stories;
        }
        private async Task<Story> GetStoryDetail(string storyId)
        {
            Story story = new Story();

            string fetchUrl = String.Format("https://hacker-news.firebaseio.com/v0/item/{0}.json" , storyId);
            using (var httpClient = new System.Net.Http.HttpClient())
            {
                using (var response = await httpClient.GetAsync(fetchUrl))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    story = JsonConvert.DeserializeObject<Story>(apiResponse);
                }
            }
            return story;
        }
    }
}