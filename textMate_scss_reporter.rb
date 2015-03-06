module SCSSLint
  # Reports a single line per lint.

  class Reporter::TextMateReporter < Reporter
    def report_lints
      return unless lints.any?

      lints.map do |lint|
        "#{type(lint)}#{message(lint)}\n#{location(lint)}\n"
      end.join("\n") + "\n"
    end

  private

    def location(lint)

      @path = Dir.pwd
      @root = "txmt://open?url=file://#{@path}/#{lint.filename}"
      # if lint.linter.engine.respond_to?(:options)
      # @path = lint.linter.engine.to_yaml
      # end
      # var txmtLink = root + err.filename + '&line=' + err.line + '&column=' + err.column;

      "#{@root.color(:red)}&line=#{lint.location.line.to_s.color(:magenta)}"
    end

    def type(lint)
      lint.error? ? '[E]'.color(:red) : '[W]'.color(:yellow)
    end

    def message(lint)
      linter_name = "#{lint.linter.name}: ".color(:green) if lint.linter
      "#{linter_name}#{lint.description}"
    end
  end
end
