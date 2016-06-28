module APITools
    def self.auth_key! key
        return CONFIG["api_key"]["enabled"] && (key == CONFIG["api_key"]["key"])
    end

    def self.generate_key
        # to-do: make unique api keys that expire
        if CONFIG["api_key"]["enabled"]
            return CONFIG["api_key"]["key"]
        else
            return ""
        end
    end
end