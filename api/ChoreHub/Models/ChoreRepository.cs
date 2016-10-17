using System;
using System.Collections.Generic;
using System.Collections.Concurrent;

namespace ChoreHub.Models
{
    public class ChoreRepository : IChoreRepository
    {
        private static ConcurrentDictionary<int, Chore> _chores = new ConcurrentDictionary<int, Chore>();

        public ChoreRepository()
        {
            Add(new Chore { Title = "First chore" });
        }

        public IEnumerable<Chore> GetAll()
        {
            return _chores.Values;
        }

        public void Add(Chore chore)
        {
            chore.ID = _chores.Count;
            _chores[chore.ID] = chore;
        }

        public Chore Find(int id)
        {
            Chore chore;
            _chores.TryGetValue(id, out chore);
            return chore;
        }

        public Chore Remove(int id)
        {
            Chore chore;
            _chores.TryRemove(id, out chore);
            return chore;
        }

        public void Update(Chore chore)
        {
            _chores[chore.ID] = chore;
        }
    }
}
