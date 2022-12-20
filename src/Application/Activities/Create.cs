using Domain;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public sealed class Create
    {
        public sealed record Command(Activity Activity) : IRequest;

        public sealed class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
