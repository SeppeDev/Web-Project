﻿using System;
using System.Collections.Generic;

namespace ChoreHub.Models
{
    public interface IChoreRepository
    {
        void Add(Chore chore);
        IEnumerable<Chore> GetAll();
        Chore Find(int id);
        Chore Remove(int id);
        void Update(Chore chore);
    }
}