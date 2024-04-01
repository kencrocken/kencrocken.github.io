require 'rake'

task :default => :build
# Execute a system command
def execute(command)
  system "#{command}" # rubocop:disable UnneededInterpolation
end

# rake build
desc 'Build the site'
task :build do
  execute('npm run build:prod && JEKYLL_ENV=production jekyll build')
end

#rake start
desc 'Start development'
task :start do
  execute('foreman start -f ./Procfile.dev')
end
