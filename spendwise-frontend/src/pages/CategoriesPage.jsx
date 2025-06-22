// src/pages/CategoriesPage.jsx
import React, { useState } from 'react';
import './CategoriesPage.css';

const CategoriesPage = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // Guarda { originalName, newName }
  
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter(c => c !== categoryToDelete));
  };
  
  const handleRenameCategory = () => {
    if (editingCategory && editingCategory.newName && !categories.includes(editingCategory.newName)) {
      setCategories(categories.map(c => (c === editingCategory.originalName ? editingCategory.newName : c)));
      setEditingCategory(null);
    }
  };

  return (
    <div className="categories-page">
      <h2>Gerenciar Categorias</h2>
      <div className="category-add-form">
        <input 
          type="text" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nome da nova categoria"
        />
        <button onClick={handleAddCategory}>Adicionar</button>
      </div>

      <ul className="categories-list">
        {categories.map(category => (
          <li key={category} className="category-item">
            {editingCategory?.originalName === category ? (
              <input 
                type="text"
                value={editingCategory.newName}
                onChange={(e) => setEditingCategory({ ...editingCategory, newName: e.target.value })}
              />
            ) : (
              <span>{category}</span>
            )}
            
            <div>
              {editingCategory?.originalName === category ? (
                <button className="action-button edit-button" onClick={handleRenameCategory}>Salvar</button>
              ) : (
                <button className="action-button edit-button" onClick={() => setEditingCategory({ originalName: category, newName: category })}>Renomear</button>
              )}
              <button className="action-button delete-button" onClick={() => handleDeleteCategory(category)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;