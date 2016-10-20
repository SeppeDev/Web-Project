using System;
using System.Collections.Generic;

namespace ChoreHub.Models
{
    public interface IImageRepository
    {
        void Add(Image image);
        IEnumerable<Image> GetAll();
        Image Find(int id);
        void Remove(int id);
        void Update(Image image);
    }
}
