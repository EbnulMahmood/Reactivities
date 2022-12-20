using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public sealed class ActivityController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ActivityController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> LoadActivities()
        {
            var activities = await _mediator.Send(new List.Query());

            return Ok(activities);
        }

        [HttpGet("{id}")] // activity/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return Ok();
        }
    }
}
