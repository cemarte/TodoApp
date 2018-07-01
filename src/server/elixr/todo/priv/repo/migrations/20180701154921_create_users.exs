defmodule Todo.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :Id, :uuid, primary_key: true
      add :Name, :string
      add :Email, :string

      timestamps([inserted_at: :CreatedAt, updated_at: :UpdatedAt])
    end

  end
end
