using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Activities
{
    public sealed class List
    {
        public sealed record Query: IRequest<IEnumerable<Activity>> { }
        public sealed class Handler : IRequestHandler<Query, IEnumerable<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}
