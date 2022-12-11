using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace API.Controllers
{
    public sealed class ActivityController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivityController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> LoadActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // activity/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}
