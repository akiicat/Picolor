require 'rails_helper'

RSpec.describe "Home", type: :request do
  describe "GET /" do
    it "works! (now write some real specs)" do
      get pallets_path
      expect(response).not_to have_http_status(:error)
    end
  end
end
