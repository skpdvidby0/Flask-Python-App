from setuptools import setup

setup(name='testkapp',
      version='1.0',
      description='OpenShift App',
      author='skp',
      author_email='example@example.com',
      url='http://www.python.org/sigs/distutils-sig/',
      install_requires=['Flask>=0.10.1','MySQL-Python','MarkupSafe','gevent'],
     )
