require 'rails_helper'

RSpec.describe Painter, type: :model do
  it "check uuid" do
    painter = create(:painter)
    expect(painter.id.size).to eq(36)
  end
end
