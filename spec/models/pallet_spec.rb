require 'rails_helper'

RSpec.describe Pallet, type: :model do
  it "user and palllet relations" do
    pallet = create(:pallet)
    expect(pallet.user.id.size).to eq(36)
  end
end
