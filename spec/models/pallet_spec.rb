require 'rails_helper'

RSpec.describe Pallet, type: :model do
  it "painter and palllet relations" do
    pallet = create(:pallet)
    expect(pallet.painter.id.size).to eq(36)
  end
end
