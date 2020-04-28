FROM ruby:2.6.3-stretch
WORKDIR /website
RUN gem install bundler:2.0.2
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
  apt-get install -y nodejs

ADD Gemfile Gemfile.lock ./
RUN bundle install

ADD package.json package-lock.json ./
RUN npm install
ADD . . 

RUN npm run build

CMD ["npm", "run", "docker"]

