FROM node:lts

# ARG ENV_VAR
# ENV ENV_VAR=VAL
ENV WORKSPACE="/tmp/workspace"

# something to do
# COPY FILE_A FILE_B
# RUN SHELL.sh
# install aws-cli
RUN mkdir -p ${WORKSPACE}
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "${WORKSPACE}/awscliv2.zip"
RUN unzip -q ${WORKSPACE}/awscliv2.zip -d ${WORKSPACE}
RUN ${WORKSPACE}/aws/install
RUN npm install -g aws-cdk

# publish port
# EXPOSE PORT

# define entrypoint
ENTRYPOINT ["tail", "-f", "/dev/null"]