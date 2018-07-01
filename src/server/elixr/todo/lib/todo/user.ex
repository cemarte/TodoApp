defmodule Todo.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @derive {Phoenix.Param, key: :id}
  # @timestamp_opts [inserted_at: :CreatedAt, updated_at: :UpdatedAt]
  schema "users" do
    field(:email, :string, source: :Email)
    field(:name, :string, source: :Name)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
  end
end
