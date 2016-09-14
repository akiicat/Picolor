require 'rails_helper'

RSpec.describe User, type: :model do
  it "check uuid" do
    user = create(:user)
    expect(user.id.size).to eq(36)
  end
end
