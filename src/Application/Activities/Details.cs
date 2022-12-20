using Domain;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public sealed class Details
    {
        public sealed record Query(Guid Id) : IRequest<Activity>;

        public sealed class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}
