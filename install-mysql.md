## Install MySQL

See what formula are available.

```bash
brew search mysql
```

```bash
==> Formulae
automysqlbackup              mysql-client                 mysql-connector-c++          mysql-utilities              mysql@5.7
mysql                        mysql-cluster                mysql-sandbox                mysql@5.5                    mysqltuner
mysql++                      mysql-connector-c            mysql-search-replace         mysql@5.6

==> Casks
mysql-connector-python  mysql-shell             mysql-utilities         mysqlworkbench          navicat-for-mysql       sqlpro-for-mysql
```

Install a version.

```bash
brew install mysql@5.7
```

```bash
==> Installing mysql@5.7
==> Downloading https://homebrew.bintray.com/bottles/mysql@5.7-5.7.23.high_sierra.bottle.tar.gz
######################################################################## 100.0%
==> Pouring mysql@5.7-5.7.23.high_sierra.bottle.tar.gz
==> /usr/local/Cellar/mysql@5.7/5.7.23/bin/mysqld --initialize-insecure --user=jjackson --basedir=/usr/local/Cellar/mysql@5.7/5.7.23 --datadir=/usr

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot
    
To have launchd start mysql@5.7 now and restart at login:
  brew services start mysql@5.7
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/mysql@5.7/bin/mysql.server start

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot
```

## Install Workbench (Pre-Catalina)

**If on Catalina then skip to next section.** 👇

```bash
brew install --cask mysqlworkbench
```

```bash
==> ==> Downloading https://downloads.mysql.com/archives/get/p/8/file/mysql-workbench-community-8.0.23-macos-x86_64.dmg
######################################################################## 100.0%
==> Verifying checksum for Cask mysqlworkbench
==> Installing Cask mysqlworkbench
==> Moving App 'MySQLWorkbench.app' to '/Applications/MySQLWorkbench.app'.
🍺  mysqlworkbench was successfully installed!
```

You should see MySQLWorkbench under `Applications`


## Guidelines for Catalina

The current version of mysqlworkbench (8.0.23) for Catalina at time of writing (June 2021) is 8.0.23 which appears to be buggy for certain updates of Catalina. Dropping down one version to 8.0.22 worked for me as follows.

If already installed then remove first.

```bash
brew uninstall --cask mysqlworkbench
```

Download formula for 8.0.22.

```bash
wget https://gist.githubusercontent.com/jonjack/de51fb456c7682cbfd55314669d6513c/raw/4b70352469035a2e35818f2c1fff0e1cb1bbec89/mysqlworkbench-8.0.22.rb
```

Now install.

```bash
brew install --cask mysqlworkbench-8.0.22.rb

==> Downloading https://downloads.mysql.com/archives/get/p/8/file/mysql-workbench-community-8.0.22-macos-x86_64.dmg
==> Downloading from https://cdn.mysql.com/archives/mysql-workbench/mysql-workbench-community-8.0.22-macos-x86_64.dmg
######################################################################## 100.0%
==> Installing Cask mysqlworkbench-8.0.22
==> Moving App 'MySQLWorkbench.app' to '/Applications/MySQLWorkbench.app'
🍺  mysqlworkbench-8.0.22 was successfully installed!
```

## Big Sur

There is also a formula here which will install v8.0.25 compatible with Big Sur.

```bash
wget https://gist.githubusercontent.com/jonjack/84e24ed5f44e452e629cfe01cf472267/raw/987362b8bd554b49ecc136213321d5f27c89efb0/mysqlworkbench-8.0.25.rb

brew install --cask mysqlworkbench-8.0.25.rb
==> Downloading https://cdn.mysql.com/Downloads/MySQLGUITools/mysql-workbench-community-8.0.25-macos-x86_64.dmg
######################################################################## 100.0%
==> Installing Cask mysqlworkbench-8.0.25
==> Moving App 'MySQLWorkbench.app' to '/Applications/MySQLWorkbench.app'
🍺  mysqlworkbench-8.0.25 was successfully installed!
```

{"mode":"full","isActive":false}
