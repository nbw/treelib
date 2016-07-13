class String
    def is_i?
       /\A[-+]?\d+\z/ === self
    end
end

class Hash
    def symbolize_keys
        self.inject({}) do |memo,(k,v)| 
            memo[k.to_sym] = v
            memo
        end
    end
end
